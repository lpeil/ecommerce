describe('Product Screen', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env().apiURL}product`, {
      fixture: 'products.json',
    }).as('getProducts');
  });

  it('visit Product Screen', () => {
    cy.visit(`${Cypress.env().baseURL}/product/1`);
  });

  it('checks render', () => {
    cy.get('.product').should('have.class', 'screen');
  });

  it('checks product has a title', () => {
    cy.get('.product .product-content h1').should('be.visible');
  });

  it('checks product has a description', () => {
    cy.get('.product .product-content p').should('be.visible');
  });

  it('checks product has a value', () => {
    cy.get('.product .product-content h6').should('be.visible').contains('$');
  });

  it('checks change quantity', () => {
    const value = 5;

    cy.get('input[name="quantity"]')
      .as('inputQuantity')
      .type(`{backspace}${value}`)
      .trigger('change');

    cy.get('@inputQuantity').should('have.value', value);
  });
});
