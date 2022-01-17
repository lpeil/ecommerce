import {
  clearCart,
  addProductToCart,
} from '../../src/store/modules/cart/cart.actions';
import ProductInterface from '../../src/interfaces/product.interface';
import products from '../fixtures/products.json';

describe('Cart', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env().apiURL}product`, {
      fixture: 'products.json',
    }).as('getProducts');
  });

  it('checks add product from home', () => {
    const product = products[0];

    cy.visit(Cypress.env().baseURL);

    cy.get('.product-card .MuiButton-contained').first().click();

    cy.location('pathname').should(($path) => {
      expect($path).equal('/cart');
    });

    cy.window()
      .its('store')
      .invoke('getState')
      .its('cart.items')
      .should(($items) => {
        expect($items[0].product.id).equal(product.id);
      });

    cy.window().its('store').invoke('dispatch', clearCart());
  });

  it('checks add product product page', () => {
    const product = products[0];
    const quantity = 5;

    cy.visit(`${Cypress.env().baseURL}/product/${product.id}`);

    cy.get('input[name="quantity"]')
      .as('inputQuantity')
      .type(`{backspace}${quantity}`)
      .trigger('change');

    cy.get('.MuiButton-contained').click();

    cy.location('pathname').should(($path) => {
      expect($path).equal('/cart');
    });

    cy.window()
      .its('store')
      .invoke('getState')
      .its('cart.items')
      .should(($items) => {
        expect($items[0].product.id).equal(product.id);
        expect($items[0].quantity).equal(quantity);
      });

    cy.window().its('store').invoke('dispatch', clearCart());
  });

  describe('Cart screen', () => {
    it('checks with no product', () => {
      cy.visit(`${Cypress.env().baseURL}/cart`);

      cy.get('.MuiTypography-h4').contains('Empty cart');

      cy.get('.summary .item .MuiTypography-body1').each(($item) =>
        cy.get($item).contains('$ 0.00'),
      );

      cy.get('.summary .MuiButton-contained').should('be.disabled');

      cy.window()
        .its('store')
        .invoke('getState')
        .its('cart.items.length')
        .should('equal', 0);
    });

    it('checks product list', () => {
      const product: ProductInterface = products[0];
      const quantity = 2;

      cy.window()
        .its('store')
        .invoke('dispatch', addProductToCart(product, quantity));

      cy.get('.my-cart .items').children().its('length').should('eq', 1);

      cy.get('.my-cart .items .item .MuiTypography-body1').contains(
        product.name,
      );

      cy.get('.my-cart .items .quantity .MuiTypography-body1').contains(
        product.price * quantity,
      );

      cy.get('.my-cart .items .quantity input[name="quantity"]').should(
        'have.value',
        quantity,
      );

      cy.get('.summary .item .MuiTypography-body1')
        .first()
        .contains(product.price * quantity);

      cy.get('.summary .item .MuiTypography-body2')
        .first()
        .contains(`${quantity} items`);

      cy.get('.summary .MuiButton-contained').should('not.be.disabled');

      cy.window()
        .its('store')
        .invoke('getState')
        .its('cart.items')
        .should(($items) => {
          expect($items[0].product.id).equal(product.id);
          expect($items[0].quantity).equal(quantity);
        });
    });

    it('checks change product quantity', () => {
      const product: ProductInterface = products[0];
      const quantity = 5;

      cy.get('.my-cart .items .quantity input[name="quantity"]')
        .as('inputQuantity')
        .type(`{backspace}${quantity}`);

      cy.get('@inputQuantity').should('have.value', quantity);

      cy.get('.my-cart .items .quantity .MuiTypography-body1').contains(
        product.price * quantity,
      );

      cy.get('.summary .item .MuiTypography-body1')
        .first()
        .contains(product.price * quantity);

      cy.get('.summary .item .MuiTypography-body2')
        .first()
        .contains(`${quantity} items`);

      cy.window()
        .its('store')
        .invoke('getState')
        .its('cart.items')
        .should(($items) => {
          expect($items[0].product.id).equal(product.id);
          expect($items[0].quantity).equal(quantity);
        });
    });

    it('checks remove product from cart', () => {
      cy.get('.my-cart .items .MuiIconButton-root').click();

      cy.get('.MuiTypography-h4').contains('Empty cart');

      cy.get('.summary .item .MuiTypography-body1').each(($item) =>
        cy.get($item).contains('$ 0.00'),
      );

      cy.get('.summary .MuiButton-contained').should('be.disabled');

      cy.window()
        .its('store')
        .invoke('getState')
        .its('cart.items.length')
        .should('equal', 0);
    });

    it('checks multiple products on cart', () => {
      const items: { product: ProductInterface; quantity: number }[] = [
        { product: products[0], quantity: 1 },
        { product: products[1], quantity: 4 },
        { product: products[2], quantity: 2 },
      ];

      const totalValue = items
        .map((item) => item.product.price * item.quantity)
        .reduce((a, b) => a + b);

      const totalItems = items
        .map((item) => item.quantity)
        .reduce((a, b) => a + b);

      items.forEach((item) => {
        cy.window()
          .its('store')
          .invoke('dispatch', addProductToCart(item.product, item.quantity));
      });

      cy.get('.my-cart .items')
        .children()
        .its('length')
        .should('eq', items.length);

      cy.get('.summary .item .MuiTypography-body1')
        .first()
        .contains(totalValue);

      cy.get('.summary .item .MuiTypography-body2')
        .first()
        .contains(`${totalItems} items`);

      cy.get(
        '.navbar .MuiButtonBase-root .MuiBadge-root .MuiBadge-badge',
      ).contains(totalItems);

      cy.get('.summary .MuiButton-contained').should('not.be.disabled');

      cy.window()
        .its('store')
        .invoke('getState')
        .its('cart.items')
        .should(($items) => {
          $items.forEach((item, key) => {
            expect(item.product.id).equal(items[key].product.id);
            expect(item.quantity).equal(items[key].quantity);
          });
        });
    });

    it('checks choose more products button', () => {
      cy.get('.summary .MuiButton-outlined').click();

      cy.location('pathname').should(($path) => {
        expect($path).equal('/');
      });
    });
  });
});
