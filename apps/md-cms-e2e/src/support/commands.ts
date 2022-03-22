declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    g: typeof g;
    gPrefix: typeof gPrefix;
    reduxStore: typeof reduxStore;
    mdEditor: typeof mdEditor;
  }
}

function g(id: string) {
  return cy.get(`[data-testid="${id}"]`);
}

function gPrefix(prefi: string) {
  return cy.get(`[data-testid^="${prefi}"]`);
}

function reduxStore() {
  return cy.window().its('store').invoke('getState');
}

function mdEditor() {
  return cy
    .g('editor')
    .get('.toastui-editor-md-container > .toastui-editor > .ProseMirror');
}

Cypress.Commands.add('g', g);
Cypress.Commands.add('gPrefix', gPrefix);
Cypress.Commands.add('reduxStore', reduxStore);
Cypress.Commands.add('mdEditor', mdEditor);
