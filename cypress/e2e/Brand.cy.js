import BrandProfile from '../Pages/Brandpage.js';

const BrandOnboarding = new BrandProfile();

describe('Brand Signup Flow', () => {
  let Data3;

  before(() => {
    cy.fixture('Branddata').then((data) => {
      Data3 = data;
    });
    cy.createUserAndFetchOtp();

    cy.visit('/');
    cy.verifyOtpAutomatically();
  });

  it('Brand onboarding should complete successfully', () => {
    BrandOnboarding.Clickbrand();
    BrandOnboarding.Clickcontinuebtn();
    BrandOnboarding.uploadProfileImagebrnd();
    BrandOnboarding.Enterbrandfirstname(Data3.BFirstName);
    BrandOnboarding.Enterbrandlastname(Data3.BLastname);
    BrandOnboarding.Enterbrandname(Data3.BrandNme);
    BrandOnboarding.Clickbrandcontibtn();
    BrandOnboarding.ClickbrandType();
    BrandOnboarding.Enteranualbudget(Data3.budget);
    BrandOnboarding.EnterEvent(Data3.Numberofevent);
    BrandOnboarding.Clickeventsubmitbtn();
    BrandOnboarding.ClicBcheckbox();
    BrandOnboarding.ClicBconfirmation();
  });

  it('Verified brand user should login successfully', () => {
    cy.loginVerifiedUser();
    cy.get("a[class='nav-link menu-link active'] span").should('contain', 'Dashboard');
    cy.url().should('eq', 'https://artestri-qa-web.neocorebank.com:8443/dashboard');
    cy.log(' Brand account holder (Brand) logged in successfully')
  });

});
