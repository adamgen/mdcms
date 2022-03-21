declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    g: typeof g;
    reduxStore: typeof reduxStore;
  }
}

function g(id: string) {
  return cy.get(`[data-testid="${id}"]`);
}

function reduxStore() {
  return cy.window().its('store').invoke('getState');
}

Cypress.Commands.add('g', g);
Cypress.Commands.add('reduxStore', reduxStore);
