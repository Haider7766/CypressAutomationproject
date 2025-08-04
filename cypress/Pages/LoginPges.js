import { loginLocators } from "./LoginLocators";
class Login {
  

  setUserName(username) {
    cy.get(loginLocators.txtuname).type(username);
  }

  setPassword(password) {
    cy.get(loginLocators.txtpassword).type(password);
  }

  clickSubmit() {
    cy.get(loginLocators.btn).click();
  }

  verifyLogin() {
    cy.get(loginLocators.lblmsg).should('have.text', 'Dashboard');
  }
}

export default Login;
