import Talent from "../Locators/TalentLocators.js";

class TalentProfile {
  lookingTalent = Talent.ImTalent;
  continueButton = Talent.Contin;
  firstname =Talent.fname
  lastname =Talent.lname
  prfskills =Talent.skills
  personaldetailsContibtn =Talent.personalcontin
  enteroccupation= Talent.occupation
  btncontinPortfolio = Talent.occupationcontin
  termandcodition = Talent.termcndcheckbox
  confimbutton = Talent.confirmbtn
  profilepic =Talent.uploadprofile
  profileinputbtn = Talent.fileInput

  clickTalent() {
    cy.get(this.lookingTalent, { timeout: 40000 })
      .should('be.visible')
      .click();
  }

  clickContinuebtn() {
    cy.get(this.continueButton, { timeout: 40000 })
      .should('be.visible')
      .click();
  }

  uploadProfileImage(){

cy.get(this.profileinputbtn, { timeout: 40000 })
    .should('exist') 
    .selectFile("cypress/fixtures/profile.jpeg", { force: true });

}

   enterfname(fname) {
    cy.get(this.firstname, { timeout: 40000 })
      .should('be.visible')
        .clear()
      .type(fname);
  }

  enterlname(lname) {
    cy.get(this.lastname, { timeout: 40000 })
      .should('be.visible')
        .clear()
      .type(lname);
  }
   clickexperties() {
    cy.get(this.prfskills, { timeout: 40000 })
      .should('be.visible')
      .click();
  }

  clickdetailcontn() {
    cy.get(this.personaldetailsContibtn, { timeout: 40000 })
      .should('be.visible')
      .click();
  }
Enteroccupation(entoccupation) {
    cy.get(this.enteroccupation, { timeout: 40000 })
      .should('be.visible')
        .clear()
      .type(entoccupation);
  }
clickportfiloconibtn() {
    cy.get(this.btncontinPortfolio, { timeout: 40000 })
      .should('be.visible')
      .click();
  }
  clicktermconditionbox(){
cy.get(this.termandcodition, { timeout: 40000 })
      .should('be.visible')
      .click();
  }
  clickconfirmationbtn() {

  cy.intercept('POST', '**/api/v1/Talent/CreateAsync').as('createTalent');

  cy.get(this.confimbutton, { timeout: 40000 })
    .should('be.visible')
    .click();
  cy.wait('@createTalent', { timeout: 60000 })
    .its('response.statusCode')
    .should('be.oneOf', [200, 201]);
}
}


export default TalentProfile;
