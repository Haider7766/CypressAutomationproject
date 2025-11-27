import AgencyProfile from '../Pages/Agencypage.js';
const AgencyOnboarding = new AgencyProfile();
describe('Agency Signup', () => {
  let Data2; 

  before(() => {
    cy.fixture('Agencydata').then((data) => {
      Data2 = data; 
    });
  });

  beforeEach(() => {
    cy.createUserAndFetchOtp();
    cy.visit('/');
  });

  it('Agency should verify OTP automatically', () => {
    cy.verifyOtpAutomatically();
    AgencyOnboarding.clickAgencyTab();
    AgencyOnboarding.clickAgencyctnbtn();
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
});
