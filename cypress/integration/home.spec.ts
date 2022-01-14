describe('Home Screen', () => {
  it('Visit Home Screen', () => {
    cy.visit(Cypress.env().baseURL);
  });
});
