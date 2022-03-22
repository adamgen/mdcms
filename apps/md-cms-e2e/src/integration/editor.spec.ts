import texts from '../fixtures/texts.json';

const checkTooltipForMissingPathOrContent = (message) => {
  cy.g('save-to-filesystem-button').trigger('mouseover');
  cy.contains('.MuiTooltip-tooltip', message).should('be.visible');
  cy.g('save-to-filesystem-button').trigger('mouseout');
  cy.contains('.MuiTooltip-tooltip').should('not.exist');
};

const prebuildTestFiles = () => {
  for (let i = 0; i < 10; i++) {
    cy.task('makeDevFile', {
      name: `file${i + 1}.md`,
      content: `# Content ${i + 1}`,
    });
  }
};

describe('Editor writes', () => {
  beforeEach(() => {
    cy.task('resetDevFilesFolder');
    cy.visit('/');
  });

  it('should write content to a file', () => {
    cy.mdEditor().type(texts.EDITOR_TYPE_CONTENT);
    cy.g('post-title').type(`my-unique-url.md`);

    cy.g('save-to-filesystem-button').trigger('mouseover');

    cy.intercept('/api/files/my-unique-url.md').as('addPost');
    cy.g('save-to-filesystem-button').click();
    cy.wait('@addPost');

    cy.task('readDevFile', 'my-unique-url.md').should(
      'equal',
      texts.EDITOR_RESULT_CONTENT
    );
  });
});

describe('Editor reads', () => {
  beforeEach(() => {
    cy.task('resetDevFilesFolder');
  });
  it('should show a list of files in the sidenav', function () {
    cy.gPrefix('file-name-').should('have.length', 0);
    prebuildTestFiles();
    cy.visit('/');
    cy.gPrefix('file-name-').should('have.length', 10);
  });

  it.only('should show a list of files in the sidenav', function () {
    cy.task('makeDevFile', {
      name: 'index.md',
      content: '# MD title',
    });
    cy.visit('/');
    cy.intercept('/api/files/index.md').as('getPost');
    cy.g('file-name--index.md').click();
    cy.wait('@getPost');

    cy.g('post-title').should('have.value', 'index.md');
    cy.mdEditor().should('have.text', '# MD title');
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
        texts.EDITOR_RESULT_CONTENT
      );
    });
  });
});
