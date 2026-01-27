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
    url: "https://artestri-demo-api.neocorebank.com:8443/api/v1/User/CreateAsync",
    timeout: 60000,
    failOnStatusCode: false,
    headers: { "Content-Type": "application/json" },
    body: { emailAddress: email, password, phoneNumber: phone }
  }).then((createRes) => {

    if (createRes.status !== 200 && createRes.status !== 201) {
      cy.log("User creation failed. Status: " + createRes.status);
      cy.log("Response body: " + JSON.stringify(createRes.body));
      throw new Error(`User creation failed: ${JSON.stringify(createRes.body)}`);
    }

    // Save creds for later login
    Cypress.env("signupEmail", email);
    Cypress.env("signupPassword", password);
    Cypress.env("signupPhone", phone);

    const fetchOtp = () => {
      return cy.request({
        method: "GET",
        url: "https://artestri-demo-ids.croeminc.com:8443/client/api/Users/GenerateEmailConfirmationCode",
        qs: { email },
        headers: {
          Accept: "application/json",
          "X-Tenant": "Artestri",
          Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlBYUklIRFYyUlZfRUZTNUU0SllPVjg0OTdKTldYLU5KRVlMUVVNU1UiLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwczovL2FydGVzdHJpLWRlbW8taWRzLmNyb2VtaW5jLmNvbTo4NDQzLyIsImV4cCI6MTc2OTU4MDY1MywiaWF0IjoxNzY5NDk0MjUzLCJhdWQiOlsiaWRlbnRpdHktYXBpIiwiY2xpZW50LWFwaSJdLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIG9mZmxpbmVfYWNjZXNzIGlkZW50aXR5YXBpLnJlYWQgaWRlbnRpdHlhcGkud3JpdGUgY2xpZW50YXBpLnJlYWQgY2xpZW50YXBpLndyaXRlIiwianRpIjoiOWI3ODU4MTUtODczOC00ZTliLWFkNTctNTQyMWVjMGZkOGNiIiwic3ViIjoic2VydmljZS13b3JrIiwibmFtZSI6IlNlcnZpY2UgV29yayAoQWxsIEZsb3dzKSIsInRlbmFuY3lfbmFtZSI6IkFydGVzdHJpIiwib2lfcHJzdCI6InNlcnZpY2Utd29yayIsIm9pX2F1X2lkIjoiZWU5YTdmZjItNjk5MS00ZGU4LWE5NDMtZTdiNTM1MjNmZTk2IiwiY2xpZW50X2lkIjoic2VydmljZS13b3JrIiwib2lfdGtuX2lkIjoiZjUyNTUxYmQtNWRiMi00NTg4LWIxYTAtMzg5ZWRlMzMwYmI1In0.T8AL2OHE43Ag0D53GPTMsI1R-_gM97wUngbI6oMBI2JljUPoosu5K0SOcT0_l7FVefUUqaWAjngT7FiAfGfhoXOmWpww6tLQEIIj4oEmX9wogBCgV3zNSzdS2Q8X3kxR_KiQXv0x2II2_cBW0dw5pPVUA2w3v7D_xm2lwIraAwcdDGAN1L2JZpNbtK89jrw-iYNh-mR98tVj7LwMOAfEvPSVUwby0PcgbanpBFXI4mukfShtZ57zzkEZFXUiWod_WB2RVkhqShUYYL4Z54xQ10IiOt85QEV4Tswo3Fw1aijau6Kfic240S9ERzUiki0CAjWy60U1-HFJrc1rqPNdRw"
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
// login function

Cypress.Commands.add("loginVerifiedUser", () => {
  const login = new Login();
  cy.visit('/login');
  login.clickmail(Cypress.env('signupEmail'));
  login.clickpassword(Cypress.env('signupPassword'));
  login.clickloginbutton(); cy.url({ timeout: 30000 }).should('not.include', 'login');
});

// country,state ,city ko auto ly k jana

Cypress.Commands.add('selectCountryStateCity', () => {

  // Country dropdown 
  cy.get('#address\\.country-select').should('be.visible');

  cy.wait('@getCountries', { timeout: 15000 }).then(({ response }) => {
    expect(response.statusCode).to.eq(200);

    let items = response.body.result || response.body.data;

    // If the body is an array itself, use it
    if (!items && Array.isArray(response.body)) {
      items = response.body;
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      cy.log("API response does not contain countries array. Body: " + JSON.stringify(response.body));
      throw new Error("No countries found in API response");
    }

    // Find Afghanistan specifically
    const country = items.find(i =>
      i.label === 'Afghanistan' ||
      i.name === 'Afghanistan' ||
      i.text === 'Afghanistan'
    );

    if (!country) {
      cy.log("Afghanistan not found in list. Available: " + items.map(i => i.label || i.name).slice(0, 10).join(', '));
      throw new Error("Could not find country 'Afghanistan'");
    }

    const countryId = country.value;

    cy.get('#address\\.country-select').select(countryId);

    // State API automatically trigger 
    cy.wait('@getStates', { timeout: 15000 }).then(({ response }) => {
      expect(response.statusCode).to.eq(200);

      let items = response.body.result || response.body.data;
      if (!items && Array.isArray(response.body)) {
        items = response.body;
      }

      if (!items || !Array.isArray(items) || items.length === 0) {
        cy.log("API response does not contain states array. Body: " + JSON.stringify(response.body));
        throw new Error("No states found");
      }
      const state = items[0];
      const stateId = state.value;

      cy.get('#address\\.state-select')
        .should('be.visible')
        .select(stateId);

      cy.wait('@getCities', { timeout: 15000 }).then(({ response }) => {
        expect(response.statusCode).to.eq(200);

        let items = response.body.result || response.body.data;
        if (!items && Array.isArray(response.body)) {
          items = response.body;
        }

        if (!items || !Array.isArray(items) || items.length === 0) {
          cy.log("API response does not contain cities array. Body: " + JSON.stringify(response.body));
          throw new Error("No cities found");
        }
        const city = items[0];

        cy.get('#address\\.city-select')
          .should('be.visible')
          .select(city.value);
      });
    });
  });
});
