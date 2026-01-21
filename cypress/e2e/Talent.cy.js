import TalentProfile from '../Pages/Talentpage.js';
const talentOnboarding = new TalentProfile();

describe('Talent Signup', () => {
  let Data1;

  before(() => {
    cy.fixture('Talentdata').then((data) => {
      Data1 = data;
    });
    cy.createUserAndFetchOtp();
    cy.visit('/');
    cy.verifyOtpAutomatically();

  });
  it('Talent onboarding flow', () => {
    talentOnboarding.clickTalent();
    talentOnboarding.clickContinuebtn();
    talentOnboarding.uploadProfileImage();
    talentOnboarding.enterfname(Data1.firstname);
    talentOnboarding.enterlname(Data1.lstname);
    talentOnboarding.clickexperties();
    talentOnboarding.clickdetailcontn();
    talentOnboarding.Enteroccupation(Data1.typeoccupation);
    talentOnboarding.clickportfiloconibtn();
    talentOnboarding.clicktermconditionbox();
    talentOnboarding.clickconfirmationbtn();
  });
  it('Verified Talent user should login successfully', () => {
    cy.loginVerifiedUser();
    cy.get("a[class='nav-link menu-link active'] span").should('contain', 'Dashboard');
    cy.url().should('eq', 'https://demo.artestri.com:8443/dashboard');
    cy.log(' Talent account holder (Agent) logged in successfully')
  });
});
