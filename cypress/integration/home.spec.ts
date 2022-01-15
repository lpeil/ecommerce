describe('Home Screen', () => {
  it('visit Home Screen', () => {
    cy.visit(Cypress.env().baseURL);
  });

  it('checks render', () => {
    cy.get('.home').should('have.class', 'screen');
  });

  it('checks load products', () => {
    cy.get('.products').children().its('length').should('be.gte', 1);

    cy.window()
      .its('store')
      .invoke('getState')
      .its('products.length')
      .should('be.gte', 1);
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

      cy.get('.products')
        .children()
        .each((product) => {
          expect(product).contain(searchValue);
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
});
