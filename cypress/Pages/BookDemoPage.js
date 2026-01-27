import DemoLocators from "../Locators/BookDemoLocators";

class DemoPage {

  democlick = DemoLocators.democlick;
  firstname = DemoLocators.firstname;
  lastname = DemoLocators.lastname;
  Companyname = DemoLocators.Companyname;
  Email = DemoLocators.Email;
  phonenumber = DemoLocators.phonenumber;
  additionaldetails = DemoLocators.additionaldetails;
  meetingreason = DemoLocators.meetingreason;
  sumbit = DemoLocators.sumbit;

  clickDemobutton() {
    cy.get(this.democlick, { timeout: 40000 })
      .click({ force: true });

  }
  fillDemoForm(firstName, lastName, companyName, email, phone,) {
    cy.get(this.firstname).clear().type(firstName);
    cy.get(this.lastname).clear().type(lastName);
    cy.get(this.Companyname).clear().type(companyName);
    cy.get(this.Email).clear().type(email);
    cy.get(this.phonenumber).clear().type(phone);
  }
  enterdetail(detail) {

    cy.get(this.additionaldetails, { timeout: 40000 })
      .should('be.visible')
      .clear()
      .type(detail)
  }
  clickmeetingreason(reasonSelector) {
    const selector = reasonSelector || this.meetingreason;
    cy.get(selector, { timeout: 40000 })
      .click({ force: true });
  }
  clicksubmit() {
    cy.get(this.sumbit, { timeout: 40000 })
      .click({ force: true });
  }
}
export default DemoPage