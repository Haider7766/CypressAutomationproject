import BrandProfile from '../Pages/Brandpage.js';
const BrandOnboarding = new BrandProfile();
describe('Brand Signup', () => {
  let Data3; 

  before(() => {
    cy.fixture('Branddata').then((data) => {
      Data3 = data; 
    });
  });

  beforeEach(() => {
    cy.createUserAndFetchOtp();
    cy.visit('/');
  });

  it('Brand should verify OTP automatically', () => {
    cy.verifyOtpAutomatically();
    BrandOnboarding.Clickbrand();
    BrandOnboarding.Clickcontinuebtn();
    BrandOnboarding.Enterbrandfirstname(Data3.BFirstName);
    BrandOnboarding.Enterbrandlastname(Data3.BLastname);
    BrandOnboarding.Enterbrandname(Data3.BrandNme)
    BrandOnboarding.Clickbrandcontibtn();
    BrandOnboarding.ClickbrandType();
    BrandOnboarding.Enteranualbudget(Data3.budget);
    BrandOnboarding.EnterEvent(Data3.Numberofevent);
    BrandOnboarding.Clickeventsubmitbtn();
    BrandOnboarding.ClicBcheckbox();
    BrandOnboarding.ClicBconfirmation();
    
     
  });
});
