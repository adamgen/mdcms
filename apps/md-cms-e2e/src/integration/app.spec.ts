describe('md-cms', () => {
  beforeEach(() => cy.visit('/'));

  it('should display file system tree', () => {
    cy.get('[data-testid="fs-tree"]');
  });
});
