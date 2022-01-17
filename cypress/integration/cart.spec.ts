import { clearCart } from '../../src/store/modules/cart/cart.actions';
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
      expect($path).contain('/cart');
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
      expect($path).contain('/cart');
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
    });
  });
});
