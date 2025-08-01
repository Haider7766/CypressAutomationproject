class Login {
  txtuname = "input[placeholder='Username']";
  txtpassword = "input[placeholder='Password']";
  btn = "button[type='submit']";
  lblmsg = ".oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module";

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
