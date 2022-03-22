import texts from '../fixtures/texts.json';

const checkTooltipForMissingPathOrContent = (message) => {
  cy.g('save-to-filesystem-button').trigger('mouseover');
  cy.contains('.MuiTooltip-tooltip', message).should('be.visible');
  cy.g('save-to-filesystem-button').trigger('mouseout');
  cy.contains('.MuiTooltip-tooltip').should('not.exist');
};

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
describe('Editor offline functions', () => {
  beforeEach(() => cy.visit('/'));

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

  it('should prevent saving when path and content are missing', () => {
    checkTooltipForMissingPathOrContent('Missing content and file path');
  });

  it('should prevent saving when path is missing', () => {
    cy.mdEditor().type(texts.EDITOR_TYPE_CONTENT);
    checkTooltipForMissingPathOrContent('Missing file path');
  });

  it('should prevent saving when content is missing', () => {
    cy.g('post-title').type(`posts/my-unique-url.md`);
    checkTooltipForMissingPathOrContent('Missing content');
  });

  it('should send a request when there are title and content', () => {
    cy.mdEditor().type(texts.EDITOR_TYPE_CONTENT);
    cy.g('post-title').type(`posts/my-unique-url.md`);

    cy.g('save-to-filesystem-button').trigger('mouseover');
    cy.contains('.MuiTooltip-tooltip').should('not.exist');

    cy.intercept('/api/files/posts/my-unique-url.md', 'true').as('addPost');
    cy.g('save-to-filesystem-button').click();
    cy.wait('@addPost').then((interception) => {
      expect(interception.request.body.content).equal(
        texts.EDITOR_RESULT_CONTENT,
      );
    });
  });
});
