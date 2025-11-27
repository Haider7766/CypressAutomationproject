import Agency from "../Locators/AgencyLocators.js";
class AgencyProfile {
  ClickAgency = Agency.ImAgency;
  Agencycontinue = Agency.AContin;
  enterfirstname = Agency.firstname;
  enterlastname = Agency.lastname;
  entercompanyname = Agency.AgencyName;
  chosetalentrepresent = Agency.TalentRepresent;
  continuebtn = Agency.AgencyCont;
  invitemember1 = Agency.invitemember;
  invitecontinuebutton = Agency.mailctnbtn;
  termandcontitioncheckbox = Agency.Agencytermcndcheckbox;
  agencyconfirmationbtn = Agency.Agencyconfirmbtn;


  
  clickAgencyTab() {
    cy.get(this.ClickAgency, { timeout: 40000 })
      .should('be.visible')
      .click();
  }

   clickAgencyctnbtn() {
    cy.get(this.Agencycontinue, { timeout: 40000 })
      .should('be.visible')
      .click();
  }

Enterfirstname(etfirstname){
 cy.get(this.enterfirstname, { timeout: 40000 })
      .should('be.visible')
        .clear()
      .type(etfirstname);

}
Enterlastname(etlastname){

    cy.get(this.enterlastname, { timeout: 40000 })
      .should('be.visible')
        .clear()
      .type(etlastname);
}
Entercompanyname(companyname){
cy.get(this.entercompanyname, { timeout: 40000 })
      .should('be.visible')
        .clear()
      .type(companyname);

}
 clickTalentRepresent() {
    cy.get(this.chosetalentrepresent, { timeout: 40000 })
      .should('be.visible')
      .click();
  }
 clickcontinuebtn() {
    cy.get(this.continuebtn, { timeout: 40000 })
      .should('be.visible')
      .click();
  }
  entermail1(member1){

cy.get(this.invitemember1, { timeout: 40000 })
      .should('be.visible')
        .clear()
      .type(member1);

  }
  clickenvitecontinuebtn() {
    cy.get(this.invitecontinuebutton, { timeout: 40000 })
      .should('be.visible')
      .click();
  }
  cliccheckboxtermagency() {
    cy.get(this.termandcontitioncheckbox, { timeout: 40000 })
      .should('be.visible')
      .click();
  }
  clicagencyconfirmbtn() {
    cy.get(this.agencyconfirmationbtn, { timeout: 40000 })
      .should('be.visible')
      .click();
  }
}


export default AgencyProfile;
