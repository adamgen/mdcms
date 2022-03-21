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

  it.only('should store editor state to redux', () => {
    cy.g('editor')
      .get('.toastui-editor-md-container > .toastui-editor > .ProseMirror')
      .type(`# Auto typed title\n\n- list item\nlist item 2`);

    cy.window()
      .its('store')
      .invoke('getState')
      .its('editor')
      .should('deep.equal', {
        path: null,
        content: '# Auto typed title\n\n- list item\n- list item 2',
        updater: 'editor',
      });
  });
});
