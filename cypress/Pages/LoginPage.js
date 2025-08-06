import { loginLocators } from '../locators/LoginLocators';

class Login {
  txtuname = loginLocators.txtuname;
  txtpassword = loginLocators.txtpassword;
  btn = loginLocators.btn;
  lblmsg = loginLocators.lblmsg;

  setUserName(username) {
    cy.get(this.txtuname).type(username);
  }

  setPassword(password) {
    cy.get(this.txtpassword).type(password);
  }

  clickSubmit() {
    cy.get(this.btn).click();
  }

  verifyLogin() {
    cy.get(this.lblmsg).should('have.text', 'Dashboard');
  }
}

export default Login;
