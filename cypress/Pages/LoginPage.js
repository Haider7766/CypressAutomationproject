import loginprofiles from "../Locators/Loginlocator";
class Login {
  email = loginprofiles.loginmail;
  password = loginprofiles.loginpasword;
  loginbtn = loginprofiles.loginbutton;
  firsttime = loginprofiles.frsttime
  clickmail(mail) {
    cy.get(this.email, { timeout: 40000 })
      .should('be.visible')
      .clear()
      .type(mail)
  }

  clickpassword(pswd) {
    cy.get(this.password, { imeout: 40000 })
      .should('be.visible')
      .clear()
      .type(pswd)
  }
  clickloginbutton() {


    cy.get(this.loginbtn, { timeout: 40000 })
      .should('be.visible')
      .click();
  }
  clickfirsttime() {
    cy.get(this.firsttime, { timeout: 40000 })
    .should('be.visible')
    .click();
  }
}
export default Login;