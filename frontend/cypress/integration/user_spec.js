describe('User', () => {
  it('can be listed', () => {
    cy.visit('');
    cy.get('h1').should('contain', 'Felhasználók');
    cy.get('a').should('contain', 'Új felhasználó');
    cy.get('th').should('contain', 'Sorszám');
    cy.get('th').should('contain', 'Név');
    cy.get('th').should('contain', 'Születési év');
    cy.get('th').should('contain', 'Admin');
    cy.get('th').should('contain', 'Létrehozva');
    cy.get('th').should('contain', 'Műveletek');

    cy.get('tbody > tr').eq(0).should('contain', 'John Wick');
    cy.get('tbody > tr').eq(0).should('contain', '1960');
    cy.get('#checkbox-is-admin-0').should('be.checked');

    cy.get('tbody > tr').eq(1).should('contain', 'Clark Kent');
    cy.get('tbody > tr').eq(1).should('contain', '1938');
    cy.get('#checkbox-is-admin-1').should('not.be.checked');
  });

  it('can create', () => {
    cy.visit('');
    cy.get('#link-add-user').click();
    cy.url().should('contain', 'add');

    cy.get('h1').should('contain', 'Felhasználó -');
    cy.get('#invalid-feedback-name').should('be.visible');
    cy.get('#invalid-feedback-birth-year').should('be.visible');

    cy.get('#input-name').type('Thomas A. Anderson');
    cy.get('h1').should('contain', 'Felhasználó - Thomas A. Anderson');
    cy.get('#input-name').should('have.value', 'Thomas A. Anderson');
    cy.get('#input-birth-year').type('1999');
    cy.get('#input-birth-year').should('have.value', '1999');
    cy.get('#checkbox-is-admin').uncheck({ force:true }).should('not.be.checked');

    cy.get('#invalid-feedback-name').should('not.be.visible');
    cy.get('#invalid-feedback-birth-year').should('not.be.visible');
    cy.get('#button-submit').click();

    cy.get('#button-reset').click();
    cy.url().should('contain', '/');
    cy.get('tbody > tr').eq(2).should('contain', 'Thomas A. Anderson');
    cy.get('tbody > tr').eq(2).should('contain', '1999');
    cy.get('#checkbox-is-admin-1').should('not.be.checked');
  });

  it('can be edit', () => {
    cy.visit('');
    cy.get('#link-edit-2').click();
    cy.url().should('contain', 'edit');
    cy.get('h1').should('contain', 'Felhasználó - Thomas A. Anderson');
    cy.get('#input-name').should('have.value', 'Thomas A. Anderson');
    cy.get('#input-birth-year').should('have.value', '1999');
    cy.get('#checkbox-is-admin').should('not.be.checked');

    cy.get('#input-name').clear().type('Neo');
    cy.get('h1').should('contain', 'Felhasználó - Neo');
    cy.get('#input-name').should('have.value', 'Neo');
    cy.get('#input-birth-year').clear().type('1969');
    cy.get('#input-birth-year').should('have.value', '1969');
    cy.get('#checkbox-is-admin').check({ force:true }).should('be.checked');
    cy.get('#button-submit').click();

    cy.get('#button-reset').click();
    cy.url().should('contain', '/');
    cy.get('tbody > tr').eq(2).should('contain', 'Neo');
    cy.get('tbody > tr').eq(2).should('contain', '1969');
    cy.get('#checkbox-is-admin-2').should('be.checked');
  });

  it('can delete', () => {
    cy.visit('');
    cy.get('tbody > tr').eq(2).should('contain', 'Neo');
    cy.get('tbody > tr').eq(2).should('contain', '1969');
    cy.get('#checkbox-is-admin-2').should('be.checked');
    cy.get('#button-delete-2').click();

    cy.get('tbody > tr').should('not.contain', 'Neo');
    cy.get('tbody > tr').should('not.contain', '1969')

  });
})
