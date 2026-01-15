import AgencyProfile from '../Pages/Agencypage.js';
const AgencyOnboarding = new AgencyProfile();
describe('Agency Signup', () => {
  let Data2;

  before(() => {
    cy.fixture('Agencydata').then((data) => {
      Data2 = data;
    });
    cy.createUserAndFetchOtp();
    cy.visit('/');
    cy.verifyOtpAutomatically();

  });

  it('Agency should verify OTP automatically', () => {

    AgencyOnboarding.clickAgencyTab();
    AgencyOnboarding.clickAgencyctnbtn();
    AgencyOnboarding.uploadProfileImageagncy();
    AgencyOnboarding.Enterfirstname(Data2.FirstName);
    AgencyOnboarding.Enterlastname(Data2.Lastname);
    AgencyOnboarding.Entercompanyname(Data2.AgencyName);
    AgencyOnboarding.clickTalentRepresent();
    AgencyOnboarding.clickcontinuebtn();
    AgencyOnboarding.entermail1(Data2.invitelink1);
    AgencyOnboarding.clickenvitecontinuebtn();
    AgencyOnboarding.cliccheckboxtermagency();
    AgencyOnboarding.clicagencyconfirmbtn();
  });
  it('Verified Agency user should login successfully', () => {
    cy.loginVerifiedUser();
    cy.log(' Agency account holder (Agent) logged in successfully')
  });

  it.skip('New Test Case', () => {
    cy.log('This is a new test case added via command');
  });

});