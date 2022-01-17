import products from '../fixtures/products.json';

describe('Home Screen', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env().apiURL}product`, {
      fixture: 'products.json',
    }).as('getProducts');
  });

  it('visit Home Screen', () => {
    cy.visit(Cypress.env().baseURL);
    cy.wait(500);
  });

  it('checks render', () => {
    cy.get('.home').should('have.class', 'screen');
  });

  describe('Left Menu', () => {
    it('checks name filter', () => {
      const searchValue = 'Intelligent';

      cy.get('.left-menu input[name="name-search"]')
        .invoke('attr', 'value', searchValue)
        .trigger('change');

      cy.get('.products .list-cards')
        .children()
        .its('length')
        .should(
          'eq',
          products.filter((p) => p.name.includes(searchValue)).length,
        );

      cy.get('.products .list-cards')
        .children()
        .get('.MuiCardContent-root h6')
        .each((productName) => {
          expect(productName).contain(searchValue);
        });

      cy.window()
        .its('store')
        .invoke('getState')
        .its('home.filters.name')
        .should('deep.equal', searchValue);
    });

    it('checks remove name filter', () => {
      cy.get('.left-menu input[name="name-search"]')
        .invoke('attr', 'value', '')
        .trigger('change');

      cy.window()
        .its('store')
        .invoke('getState')
        .its('home.filters.name')
        .should('deep.equal', '');
    });

    it('checks value filter', () => {
      cy.get('[data-cy="slider-price"]').setSlider([100, 200]);

      cy.get('.products .list-cards')
        .children()
        .its('length')
        .should(
          'eq',
          products.filter((p) => p.price >= 100 && p.price <= 200).length,
        );

      cy.window()
        .its('store')
        .invoke('getState')
        .its('home.filters.price')
        .should('deep.equal', [100, 200]);
    });

    it('checks remove value filter', () => {
      const productsValues: number[] = products.map((product) => product.price);
      const mostExpensiveProductPrice = Math.max(...productsValues);

      cy.get('[data-cy="slider-price"]').setSlider([
        0,
        mostExpensiveProductPrice,
      ]);

      cy.get('.products .list-cards')
        .children()
        .its('length')
        .should('eq', products.length);

      cy.window()
        .its('store')
        .invoke('getState')
        .its('home.filters.price')
        .should('deep.equal', [0, mostExpensiveProductPrice]);
    });
  });

  describe('List cards', () => {
    it('checks load products', () => {
      cy.get('.products .list-cards')
        .children()
        .its('length')
        .should('be.gte', 1);

      cy.window()
        .its('store')
        .invoke('getState')
        .its('products.length')
        .should('be.gte', 1);
    });

    it('checks product card render', () => {
      cy.get('.products .list-cards')
        .children()
        .should('have.class', 'product-card');
    });

    it('checks product card has a image', () => {
      cy.get('.products .list-cards')
        .children()
        .children('.MuiPaper-root')
        .children('.MuiCardMedia-root')
        .should('be.visible');
    });

    it('checks product card has a name', () => {
      cy.get('.products .list-cards')
        .children()
        .children('.MuiPaper-root')
        .children('.MuiCardContent-root')
        .children('h6')
        .should('be.visible');
    });

    it('checks product card has a price', () => {
      cy.get('.products .list-cards')
        .children()
        .children('.MuiPaper-root')
        .children('.MuiCardContent-root')
        .children('p')
        .should('be.visible')
        .contains('$');
    });

    it('checks product card button visit', () => {
      cy.get('.products .list-cards')
        .children()
        .children('.MuiPaper-root')
        .children('.MuiCardContent-root')
        .children('.MuiButton-root:last-child')
        .should('be.visible')
        .first()
        .click();

      cy.location('pathname').should(($path) => {
        expect($path).contain('/product/');
      });

      cy.visit(Cypress.env().baseURL);
    });
  });

  describe('Order By', () => {
    it('checks product order by id', () => {
      cy.get('[name="product-order-by"]').parent().click();

      cy.findByRole('option', {
        name: 'Featured',
      }).click();

      cy.get('[name="product-order-by"]').should('have.value', 'Featured');

      cy.window()
        .its('store')
        .invoke('getState')
        .its('home.orderBy')
        .should('deep.equal', { field: 'id', order: 'asc' });
    });

    it('checks product order by price low to high', () => {
      cy.get('[name="product-order-by"]').parent().click();

      cy.findByRole('option', {
        name: 'Price: Low to High',
      }).click();

      cy.get('[name="product-order-by"]').should(
        'have.value',
        'Price: Low to High',
      );

      cy.window()
        .its('store')
        .invoke('getState')
        .its('home.orderBy')
        .should('deep.equal', { field: 'price', order: 'asc' });
    });

    it('checks product order by price high to low', () => {
      cy.get('[name="product-order-by"]').parent().click();

      cy.findByRole('option', {
        name: 'Price: High to Low',
      }).click();

      cy.get('[name="product-order-by"]').should(
        'have.value',
        'Price: High to Low',
      );

      cy.window()
        .its('store')
        .invoke('getState')
        .its('home.orderBy')
        .should('deep.equal', { field: 'price', order: 'desc' });
    });

    it('checks product order by name a to z', () => {
      cy.get('[name="product-order-by"]').parent().click();

      cy.findByRole('option', {
        name: 'Name: A to Z',
      }).click();

      cy.get('[name="product-order-by"]').should('have.value', 'Name: A to Z');

      cy.window()
        .its('store')
        .invoke('getState')
        .its('home.orderBy')
        .should('deep.equal', { field: 'name', order: 'asc' });
    });

    it('checks product order by name z to a', () => {
      cy.get('[name="product-order-by"]').parent().click();

      cy.findByRole('option', {
        name: 'Name: Z to A',
      }).click();

      cy.get('[name="product-order-by"]').should('have.value', 'Name: Z to A');

      cy.window()
        .its('store')
        .invoke('getState')
        .its('home.orderBy')
        .should('deep.equal', { field: 'name', order: 'desc' });
    });
  });

  describe('Mobile Drawer', () => {
    beforeEach(() => {
      cy.viewport(375, 667);
    });

    it('checks render filters button', () => {
      cy.get('.mobile-filters button').should('be.visible');
    });

    it('checks left menu and order by is not visible', () => {
      cy.get('.left-menu').should('not.be.visible');
      cy.get('.products .MuiBox-root > .order').should('not.be.visible');
    });

    it('checks drawer open', () => {
      cy.get('.mobile-filters button').click();
      cy.get('.filters-drawer').should('be.visible');
    });

    it('checks drawer has order by', () => {
      cy.get('.filters-drawer .filters-content input[name="product-order-by"]')
        .parent()
        .should('be.visible');
    });

    it('checks drawer has name search', () => {
      cy.get('.filters-drawer .filters-content input[name="name-search"]')
        .parent()
        .should('be.visible');
    });

    it('checks drawer has price slider', () => {
      cy.get('.filters-drawer .filters-content input[name="price-search"]')
        .first()
        .parent()
        .should('exist');
    });

    it('checks drawer close', () => {
      cy.get('.filters-drawer .filters-head svg').first().click();

      cy.wait(500);

      cy.get('.filters-drawer').should('not.exist');
    });

    it('checks drawer apply filters', () => {
      cy.get('.mobile-filters button').click();
      cy.get('.filters-drawer .filters-content .MuiButton-root')
        .first()
        .click();

      cy.wait(500);

      cy.get('.filters-drawer').should('not.exist');
    });
  });
});
