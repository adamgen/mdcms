describe('md-cms', () => {
  beforeEach(() => cy.visit('/'));

  it('should display file system tree', () => {
    cy.get('[data-testid="fs-tree"]');
  });

  it('should toggle the side menu on and off', () => {
    cy.g('side-menu-container').should('be.visible');
    cy.g('side-menu-toggle').click();
    cy.g('side-menu-container').should('not.be.visible');
    cy.g('side-menu-toggle').click();
    cy.g('side-menu-container').should('be.visible');
  });

  it.only('should create a new post', () => {
    cy.g('new-post-button').click();
  });
});
