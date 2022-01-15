describe('Home Screen', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env().apiURL}product`, {
      fixture: 'products.json',
    }).as('getProducts');
  });

  it('visit Home Screen', () => {
    cy.visit(Cypress.env().baseURL);
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

      cy.get('.left-menu .stack').children().should('have.length', '1');
      cy.get('.left-menu .stack')
        .children()
        .get('.MuiChip-label')
        .contains(searchValue);

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
      cy.get('.left-menu .stack')
        .children()
        .get('.MuiSvgIcon-root')
        .click({ multiple: true });

      cy.get('.left-menu .stack').children().should('have.length', '0');

      cy.window()
        .its('store')
        .invoke('getState')
        .its('home.filters.name')
        .should('deep.equal', '');
    });

    it('checks value filter', () => {
      cy.get('.left-menu input[name="price-search"]')
        .first()
        .click(50, 0, { force: true });

      cy.get('.left-menu .stack').children().should('have.length', '1');
    });

    it('checks remove value filter', () => {
      cy.get('.left-menu .stack')
        .children()
        .get('.MuiSvgIcon-root')
        .click({ multiple: true });

      cy.get('.left-menu .stack').children().should('have.length', '0');
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
});