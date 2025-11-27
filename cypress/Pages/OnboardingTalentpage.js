import onboardingLocators from "../Locators/Onboarding.js";

class OnboardTalent {
  startnowbtn = onboardingLocators.startnow;
  emailField = onboardingLocators.emailInput;
  phoneField = onboardingLocators.phoneInput;
  passwordField = onboardingLocators.passwordInput;
  confirmpasswordField = onboardingLocators.confirpasswordInput;
  continuebutton = onboardingLocators.continuebtn;

  clickStartNow() {
    cy.get(this.startnowbtn, { timeout: 40000 })
      .should('be.visible')
      .click();
  }

  enterEmail(email) {
    cy.get(this.emailField, { timeout: 8000 })
      .should('be.visible')
      .clear()
      .type(email);
  }

  enterPhone(phone) {
    cy.get(this.phoneField, { timeout: 8000 })
      .should('be.visible')
      .clear()
      .type(phone);
  }

  enterPassword(password) {
    cy.get(this.passwordField, { timeout: 8000 })
      .should('be.visible')
      .clear()
      .type(password);
  }

  enterConfirmpassword(confirmpassword) {
    cy.get(this.confirmpasswordField, { timeout: 8000 })
      .should('be.visible')
      .clear()
      .type(confirmpassword);
  }

  clickContinuebutton() {
    cy.get(this.continuebutton, { timeout: 8000 })
      .should('be.visible')
      .click();
  }
}

export default OnboardTalent;
