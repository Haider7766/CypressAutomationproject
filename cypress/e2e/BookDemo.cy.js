import DemoPage from "../Pages/BookDemoPage";
import { generateUniqueEmail } from "../support/dataHelper";
const demoPage = new DemoPage();
describe('Book demo form', () => {
  let Data3;

  const reasons = [
    '.reasons-list > :nth-child(1)',
    ':nth-child(2) > .align-items-start > .text-start',
    ':nth-child(3) > .align-items-start > .text-start > .reason-title' 
  ];

  before(() => {
    cy.fixture('BookDemoData').then((data) => {
      Data3 = data;
    });
  });

  reasons.forEach((reason, index) => {
    it(`Should book demo successfully with meeting reason option ${index + 1}`, () => {
      const uniqueEmail = generateUniqueEmail(`bookdemo${index + 1}`);
      cy.visit('/');
      cy.intercept('GET', '**/GetCountriesAsync').as('getCountries');
      cy.intercept('GET', '**/GetStatesByCountryIdAsync*').as('getStates');
      cy.intercept('GET', '**/GetCitiesByStateIdAsync*').as('getCities');

      demoPage.clickDemobutton();
      demoPage.fillDemoForm(Data3.FirstName, Data3.LastName, Data3.CompanyName, uniqueEmail, Data3.phonenumber, Data3);
      cy.selectCountryStateCity();
      demoPage.enterdetail(Data3.details);
      demoPage.clickmeetingreason(reason);
      demoPage.clicksubmit();
    });
  });
});