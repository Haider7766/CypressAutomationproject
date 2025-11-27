import TalentProfile from '../Pages/Talentpage.js';
const talentOnboarding = new TalentProfile();

describe('Talent Signup', () => {
  let Data1; // declare variable here so it's accessible in all hooks and tests

  before(() => {
    cy.fixture('Talentdata').then((data) => {
      Data1 = data; // assign fixture data
    });
  });

  beforeEach(() => { 
    cy.createUserAndFetchOtp();
    cy.visit('/');
  });

  it('Talent should verify OTP automatically', () => {
    cy.verifyOtpAutomatically();
    talentOnboarding.clickTalent();
    talentOnboarding.clickContinuebtn();
    talentOnboarding.enterfname(Data1.firstname); 
    talentOnboarding.enterlname(Data1.lstname);
    talentOnboarding.clickexperties();
    talentOnboarding.clickdetailcontn();
    talentOnboarding.Enteroccupation(Data1.typeoccupation);
    talentOnboarding.clickportfiloconibtn();
    talentOnboarding.clicktermconditionbox();
    talentOnboarding.clickconfirmationbtn();

  });
});
