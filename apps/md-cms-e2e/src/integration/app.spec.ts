import texts from '../fixtures/texts.json';

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

  it('should store editor state to redux', function () {
    cy.mdEditor().type(texts.EDITOR_TYPE_CONTENT);

    cy.reduxStore().its('editor').should('deep.equal', {
      path: null,
      content: texts.EDITOR_RESULT_CONTENT,
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

  it('should store title and content state to redux', () => {
    cy.mdEditor().type(texts.EDITOR_TYPE_CONTENT);
    cy.g('post-title').type(`posts/my-unique-url.md`);

    cy.reduxStore().its('editor').should('deep.equal', {
      path: 'posts/my-unique-url.md',
      content: texts.EDITOR_RESULT_CONTENT,
      updater: 'other',
    });
  });
});
