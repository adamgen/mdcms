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

  it('should store editor state to redux', () => {
    cy.g('editor')
      .get('.toastui-editor-md-container > .toastui-editor > .ProseMirror')
      .type(`# Auto typed title\n\n- list item\nlist item 2`);

    cy.reduxStore().its('editor').should('deep.equal', {
      path: null,
      content: '# Auto typed title\n\n- list item\n- list item 2',
      updater: 'editor',
    });
  });

  it('should store title state to redux', () => {
    cy.g('post-title').type(`posts/my-unique-url.md`);

    cy.reduxStore().its('editor').should('deep.equal', {
      path: `posts/my-unique-url.md`,
      content: '',
      updater: 'other',
    });
  });
});
