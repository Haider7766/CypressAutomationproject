import { loginLocators } from '../locators/LoginLocators';

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.get(loginLocators.txtuname).type(username);
  cy.get(loginLocators.txtpassword).type(password);
  cy.get(loginLocators.btn).click();
  cy.get(loginLocators.lblmsg).should('have.text', 'Dashboard');
});
