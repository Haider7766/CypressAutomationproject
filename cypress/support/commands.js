import Login from '../Pages/LoginPage';

const DEFAULT_PHONE = "15444645656";

Cypress.Commands.add("createUserAndFetchOtp", () => {
  const random = Date.now();
  const email = `testuser${random}@mailinator.com`;
  const password = "Abbasi@123";
  const phone = DEFAULT_PHONE;

  cy.log("Creating user: " + email);

  return cy.request({
    method: "POST",
    url: "https://artestri-qa-api.neocorebank.com:8443/api/v1/User/CreateAsync",
    timeout: 60000,
    failOnStatusCode: false,
    headers: { "Content-Type": "application/json" },
    body: { emailAddress: email, password, phoneNumber: phone }
  }).then((createRes) => {

    if (createRes.status !== 200 && createRes.status !== 201) {
      throw new Error("User creation failed");
    }

    // Save creds for later login
    Cypress.env("signupEmail", email);
    Cypress.env("signupPassword", password);
    Cypress.env("signupPhone", phone);

    const fetchOtp = () => {
      return cy.request({
        method: "GET",
        url: "https://demo-ids-client-api.croeminc.com:8443/api/Users/GenerateEmailConfirmationCode",
        qs: { email },
        headers: {
          Accept: "application/json",
          "X-Tenant": "Artestri",
          Authorization: "Bearer eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiJQWFJJSERWMlJWX0VGUzVFNEpZT1Y4NDk3Sk5XWC1OSkVZTFFVTVNVIiwidHlwIjoiYXQrand0IiwiY3R5IjoiSldUIn0.c7_l4q0IhfcYhwKl-UAKZu5lmX6Q780A0cE_lD-kAIVbJW59_Tb4l_Odg3aBggRXj3dL8JD_bT6rZSPvF5ikS6_Ecyu2ZNAYnMxMuyHcx6HNQbEQbr7bqdu2HogkfO6XYNAaGKoJC9I1Z9-xEWYkqAYX0RvzjBspXu19Z7djOHz9pIKwyU-YbS9jiFBg2--8XJk-r77Fp_3CgR1MBnI808xBy9Me-RtDKWyLnTsXzcxNF4YH7lLTSzBAzmynzG9xcKR0Y8WPEszjc72ZUKOwSABXRuc3NrDr2nTSP3fwCmJxvzKJNqR4e98wHLe4lCfk3n-FcC11LpZot1eigUXkAA.9y0kyjuWpYX6RyRcTyvTFA.Mh0XZ4dEtsAZHVPV9T9F3ViT49W4T63bcif9V4qyHuUcjxVfVMs9nIj1VJEai7Bz_G3GW1-XGmf5M1mWvXdbuTvfEO0vb6IJlVg3frtKpD8aGqoEmSlQ9eJAicdNmCyJByffyHdv8LKPMgQaXtMarOIBDRDc8pD5MyfuJn0-RjfaEpjnfhdiM9TnWBkBDaBYka8AymsxW2Puxt4ARMOO_i2T993NJtLlYJtB2ncepa9bFAUpcFG1VAVOuo4gTYKEwYqd4JZHTFeJyjqiKSgN67j0KajDkqCY3g9MLsfVbAUfV_BHblxneFJi69cVajxDvnvnpJpvUOI8_dT1BwWSDkQJl0pvSpxlxx_LMQkWbdR7MJmezETtHVp975Ig5FoyTcQMYqGy9AWE3NXQkT92tJERUttRZdzR6vE-lZA0yIAKT90BudJY8Kg50hgw0dXR4oatmYZtgtkmDpCrYt2aZ8N_DjaSDRG7kLvigVd2cV01JUZq05eR0HjqVXNxFTpwSS87GduX15kHWE4zu6ZzaEhi57qxAa40p1pdubbZOB20A4G9GPSBlGAP-L6w4VDNu1y_4LSxM0pUodLBDJdMhOyckAKJL40rIrs5aDXjOUfLwpJNOny2JC7CQI--TvociPnQdFpQR8ncpmsNMknKD-iFJJT06g7xrLbcSUDLtA_RVR_qKN8L4n4tXlQQdTxCFgYkYthIAcd0xDHZg5Hxk4DFeAlKLkQQ70d8YUjFA6OzKb1zBszJHMhn3WDy_Sl3SiT2IoJOMTcAQeD8UCXrmbHKd4S3B341EuQICcNZwKmmgShTJSGZOQJu19clUTk2Rj-OJ1_8PK2FipF8QdFTabu06s4LwxqTTGLVay1d2hmYcdVdbhxWRSV3i6UEZU-z5nJHU-HZw8Ar42XWr2AtVl410muLTPi1_fyWknR-22DNETKQ6zShKtW6fO7Wgvz7uk803OIiuycZb2AEgJp5kN85CszOYn04Jt9NCkpVC2SQ9fGehq32d1iboMThYAVfif_HnbWoCj1Ta4GhVV0crdC-zEW5_zhC4aYshVXAsbHMuAPxKrXGmm9ZtJBphJTcVz-ppmJVDYxaXG1MSt-VaAMFgaak4a8TECcDH3F5cX7C1R-_azumYLWEktLpfOlJ9zsFu5b3iQMkqh4quW8g0MIDKP_nZOSOIAvyTSjjJrJUD6D0U0jN8iJNGCOWF5QED3GcZ2q5VQWFWzp61XksBRPKuNIdxuJcm0rGZ-m-Hvze6gALOAYPEV8aZabOmdX718o2gGPDQ87rtDT94Qx4vYYc2Ug_Drm1RvLKE5d1P59wYQFjW58x1q4A7NTrFn6O0-gQFG3ccuefdvNlKUlcdAdxLoqkPqR8oz8iPqdbuGLFKycmNj-qBXpPFSw7BmouECanDytFltIEJuHT-AHKIvjdzV7lAZo7PnauulkAfDcyOPWSS_0GccFHVICMfTadVr5byi2RfI3lyShDMC4HWt1EHNyYYMw__1_ECS241KQ.FHbe4k32mhfR2L_A4Nx2hC8ynYEJYH4fsXHTJmv3_qM"
        },
        failOnStatusCode: false
      }).then((otpRes) => {

        const retryAfter = otpRes.body?.data?.retryAfterSeconds || 2;

        if (otpRes.status === 429) {
          cy.wait(retryAfter * 1000);
          return fetchOtp();
        }

        if (otpRes.body?.data?.token) {
          Cypress.env("otpCode", otpRes.body.data.token);
          return;
        }

        throw new Error("OTP fetch failed");
      });
    };

    return fetchOtp();
  });
});


//  OTP VERIFY ONLY (NO LOGIN HERE)
Cypress.Commands.add("verifyOtpAutomatically", () => {
  const email = Cypress.env("signupEmail");
  const otp = Cypress.env("otpCode");
  const phone = Cypress.env("signupPhone");

  const OnboardTalent = require('../Pages/OnboardingTalentpage.js');
  const onboarding = new OnboardTalent();

  onboarding.clickStartNow();
  onboarding.enterEmail(email);
  onboarding.enterPhone(phone);
  onboarding.enterPassword("Abbasi@123");
  onboarding.enterConfirmpassword("Abbasi@123");
  onboarding.clickContinuebutton();

  cy.get('#otp-0', { timeout: 80000 }).should('be.visible');

  otp.split('').forEach((digit, index) => {
    cy.get(`#otp-${index}`).clear().type(digit);
  });

  cy.url({ timeout: 20000 }).should('not.include', 'verify');
});


Cypress.Commands.add("loginVerifiedUser", () => {
  const login = new Login();

  cy.visit('/login');

  login.clickmail(Cypress.env('signupEmail'));
  login.clickpassword(Cypress.env('signupPassword'));
  login.clickloginbutton();

  cy.url({ timeout: 30000 }).should('not.include', 'login');
});


// country,state ,city ko auto ly k jana


Cypress.Commands.add('selectCountryStateCity', () => {
  // Intercepts yahan set karo
  cy.intercept('GET', '**/GetCountriesAsync').as('getCountries');
  cy.intercept('GET', '**/GetStatesByCountryIdAsync*').as('getStates');
  cy.intercept('GET', '**/GetCitiesByStateIdAsync*').as('getCities');
  
  // Country dropdown ko interact karo (API trigger hogi)
  cy.get('#address\\.country-select').should('be.visible');
  
  cy.wait('@getCountries', { timeout: 15000 }).then(({ response }) => {
    expect(response.statusCode).to.eq(200);
    
    const country = response.body.result[0]; 
    const countryId = country.value;
    
    cy.get('#address\\.country-select').select(countryId);
    
    // State API automatically trigger hogi country select karne par
    cy.wait('@getStates', { timeout: 15000 }).then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      
      const state = response.body.result[0];
      const stateId = state.value;
      
      cy.get('#address\\.state-select')
        .should('be.visible')
        .select(stateId);
      
      cy.wait('@getCities', { timeout: 15000 }).then(({ response }) => {
        expect(response.statusCode).to.eq(200);
        
        const city = response.body.result[0];
        
        cy.get('#address\\.city-select')
          .should('be.visible')
          .select(city.value);
      });
    });
  });
});