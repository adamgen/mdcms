describe('Cypress task integration', () => {
  it('Cypress integrates with file system through task successfully', () => {
    cy.task('resetDevFilesFolder');
    cy.task('listDevFiles').should('be.empty');
    cy.task('readDevFile', 'index.md').should('be.null');
    cy.task('makeDevFile', {
      name: 'index.md',
      content: '# MD title',
    });
    cy.task('listDevFiles').should('deep.equal', ['index.md']);
    cy.task('makeDevFile', {
      name: 'blog.md',
      content: '# MD blog title',
    });
    cy.task('listDevFiles').should('have.length', 2);
    cy.task('readDevFile', 'index.md').should('equal', '# MD title');
    cy.task('readDevFile', 'blog.md').should('equal', '# MD blog title');
    cy.task('resetDevFilesFolder');
    cy.task('listDevFiles').should('be.empty');
  });
});
