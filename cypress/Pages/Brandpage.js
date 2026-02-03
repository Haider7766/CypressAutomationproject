import Brand from "../Locators/BrandLocators";
class BrandProfile{
clickbrand = Brand.ImBrand;
clickbrancontinuebtn = Brand.BContin;
enterbrandfname = Brand.Bfirstname;
enterbrandlname = Brand.Blastname;
enterbrandname =Brand.BrandName
clickbrandcntbtn =Brand.BrandCont;
clickbrandtype = Brand.brandeventtype;
enterannualbudget = Brand.annualbudget;
enterevent = Brand.noOfevent;
clickventcontinuebtn =Brand.eventcontbtn;
clickbrandcheckbox = Brand.Brandcheckbox;
clicklbrandconfrmbtn = Brand.Brandconfirmbtn;
fileinputbrndbtn= Brand.fileInputbrnd;

  Clickbrand(){
cy.get(this.clickbrand, { timeout: 40000 })
      .should('be.visible')
      .click();
  }

Clickcontinuebtn(){

cy.get(this.clickbrancontinuebtn, { timeout: 40000 })
      .should('be.visible')
      .click();
}

uploadProfileImagebrnd(){

cy.get(this.fileinputbrndbtn, { timeout: 40000 })
    .should('exist') 
    .selectFile("cypress/fixtures/profile.jpeg", { force: true });

}

Enterbrandfirstname(brandfname){

cy.get(this.enterbrandfname, { timeout: 40000 })
      .should('be.visible')
        .clear()
      .type(brandfname);

}
Enterbrandlastname(brandlname){

    cy.get(this.enterbrandlname, {timeout: 40000})
    .should('be.visible')
    .clear()
    .type(brandlname);
}

Enterbrandname(brandname){

    cy.get(this.enterbrandname, {timeout: 40000})
    .should('be.visible')
    .clear()
    .type(brandname);
}


Clickbrandcontibtn(){

cy.get(this.clickbrandcntbtn, { timeout: 40000 })
      .should('be.visible')
      .click();
}
ClickbrandType(){

cy.get(this.clickbrandtype, { timeout: 40000 })
      .should('be.visible')
      .click();
}

Enteranualbudget(budget){
cy.get(this.enterannualbudget, {timeout: 40444})
    .should('be.visible')
    .clear()
    .type(budget);

}

EnterEvent(event){
cy.get(this.enterevent, {timeout: 40000}) 
    .should('be.visible')
    .clear()
    .type(event);
}

Clickeventsubmitbtn(){

cy.get(this.clickventcontinuebtn, { timeout: 40000 })
      .should('be.visible')
      .click();

}
ClicBcheckbox(){
cy.get(this.clickbrandcheckbox, { timeout: 40000 })
      .should('be.visible')
      .click();
  }
  ClicBconfirmation(){

  cy.get(this.clicklbrandconfrmbtn, { timeout: 40000 })
    .should('be.visible')
    .click();
  
  }
}

export default BrandProfile