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
          Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlBYUklIRFYyUlZfRUZTNUU0SllPVjg0OTdKTldYLU5KRVlMUVVNU1UiLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwczovL2FydGVzdHJpLWRlbW8taWRzLmNyb2VtaW5jLmNvbTo4NDQzLyIsImV4cCI6MTc2OTA2MjE0MCwiaWF0IjoxNzY4OTc1NzQwLCJhdWQiOlsiaWRlbnRpdHktYXBpIiwiY2xpZW50LWFwaSJdLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIG9mZmxpbmVfYWNjZXNzIGlkZW50aXR5YXBpLnJlYWQgaWRlbnRpdHlhcGkud3JpdGUgY2xpZW50YXBpLnJlYWQgY2xpZW50YXBpLndyaXRlIiwianRpIjoiODU1ZTg3NzItYmU3NS00NTRlLWFmNjYtY2FiZWNlZDVlN2RhIiwic3ViIjoic2VydmljZS13b3JrIiwibmFtZSI6IlNlcnZpY2UgV29yayAoQWxsIEZsb3dzKSIsInRlbmFuY3lfbmFtZSI6IkFydGVzdHJpIiwib2lfcHJzdCI6InNlcnZpY2Utd29yayIsIm9pX2F1X2lkIjoiNmJmYzZlYmQtNTljNS00OGJjLTkyMWItNmE2ZjM1ODI2MzE4IiwiY2xpZW50X2lkIjoic2VydmljZS13b3JrIiwib2lfdGtuX2lkIjoiYjA1MWU5NGQtYWZmYi00ZjhlLThlYmQtYTI5ZTYwYjg2OGYyIn0.OWtnHLibNN1wXEFzFyw4JP__YVwB2Z0F2gCJdGYPCvCZvsjqLMPflucLqmSr3Dl2hXt2wqckcNVvCMtD48Z8ETuNEQJU-n5W1FXrXyozn4Mpv_tQg8y2DzsnWUYKCC1I3HOaBA13GmsZQ_jxfuLADlx4IdMr6fODp7AgThk86xlvNVIJ6frurD8-9WK-WoH8m7CLc2vyPnASZF9CEKZ_CCKRqYg8PG-ymS0tupPbC4zk7dogSS8N5-tPsrBTehUlQBBanbs3Xiu2TYSqqryl0uXUPnU5G_TymKs5MA-42uYibDDed0qAFAAqzbZrhOTotyEXHpSg-oQ1WkSx2b8oeg"
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

    const country = response.body.result[4];
    const countryId = country.value;

    cy.get('#address\\.country-select').select(countryId);

    // State API automatically trigger 
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
