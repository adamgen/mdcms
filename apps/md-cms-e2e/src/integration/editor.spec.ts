import texts from '../fixtures/texts.json';

const checkTooltipForMissingPathOrContent = (message) => {
  cy.g('save-to-filesystem-button').trigger('mouseover');
  cy.contains('.MuiTooltip-tooltip', message).should('be.visible');
  cy.g('save-to-filesystem-button').trigger('mouseout');
  cy.contains('.MuiTooltip-tooltip', message).should('not.be.visible');
};

describe('Editor online functions changes file system', () => {
  it('should add a file to the filesystem on save file', () => {});
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
});
