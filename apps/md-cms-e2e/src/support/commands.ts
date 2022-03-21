declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    g: typeof g;
  }
}

function g(id: string) {
  return cy.get(`[data-testid="${id}"]`);
}

Cypress.Commands.add('g', g);
