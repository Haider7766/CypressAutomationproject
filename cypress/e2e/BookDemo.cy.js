import DemoPage from "../Pages/BookDemoPage";
import { generateUniqueEmail } from "../support/dataHelper";
const demoPage = new DemoPage();
describe('Book demo form', () => {
  let Data3; 

  before(() => {
    cy.fixture('BookDemoData').then((data) => {
      Data3 = data; 
    });
     cy.visit('/');
  });
  it('Should book demo successfully with valid data', () => {
     const uniqueEmail = generateUniqueEmail("bookdemo");
     cy.intercept('GET', '**/GetCountriesAsync').as('getCountries');
  cy.intercept('GET', '**/GetStatesByCountryIdAsync*').as('getStates');
  cy.intercept('GET', '**/GetCitiesByStateIdAsync*').as('getCities');
demoPage.clickDemobutton();
demoPage.fillDemoForm(Data3.FirstName,Data3.LastName,Data3.CompanyName,uniqueEmail,Data3.phonenumber,Data3);
cy.selectCountryStateCity();
demoPage.enterdetail(Data3.details);
demoPage.clickmeetingreason();
demoPage.clicksubmit();
  });  
});