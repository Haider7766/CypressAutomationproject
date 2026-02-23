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
        url: "https://artestri-qa-ids.croeminc.com:8443/client/api/Users/GenerateEmailConfirmationCode",
        qs: { email },
        headers: {
          Accept: "application/json",
          "X-Tenant": "Artestri",
          Authorization: "Bearer eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiJQWFJJSERWMlJWX0VGUzVFNEpZT1Y4NDk3Sk5XWC1OSkVZTFFVTVNVIiwidHlwIjoiYXQrand0IiwiY3R5IjoiSldUIn0.e6-iF37nAPHzVIjxJ5_uulQpJ8GG7bQgDqvYq7b2hOYI_TySoyb9J5vT1dma5Lnvz1ByLf1DAxk7g3CBc_ugnAun1uVNwl5WqNV6QcD_oyCc52IVreCEjed7PLWj8uWbcC_U9yxvXVWfDOlKT6nbZ7Km_lj_67rg-s0RbM9UIKQbJYaoVkUxy6baD0L21vNSrN9en4JvEmKzDkPuj89_kHnHne9bCWxP1ZPSxpgZ7D13FH_Ohid-fq2Q0KHGVAty2b-e3TC5LYsh73XqfHGzLdnlGbIKtFpERjgfYej4cxFIP1Zbfwl6BI9uwg200rtOYjHkn7CcxSBLB1S2UeXoPQ.IlGLzr2bo9wp2wpA9Onf-w.K_X9LUgr0iyK7p60Um-LMQ3_EQzzTrxFxpWu3VyelnVpXI4K8pNlcv7yycyn5bYrxMY0Yk76e9Z83ICyhx_6r-GW-o09nHBoti3yVUpmP4jsxQfz_BD823Dr1mxsNaLo6An5-4LFL0oWl9FiCrl05L2VAledbmHnlNG0ABYWf1UYQIVzOuoNMFfldgZIHJXfghAmO3wvM94ix0FjfpRevFdn54c4Gu104iHU357L2o26emZRSq97a_iTsh5ZlbOXnmLl_GgU9gp8fv4Dq6Mf1rNbwIYExSoUu0F4wBhbzHzVSavZi6mrhiTNZGy0edCKBeC1k5Crsa6KF_V61Gn57AZNZ--xD2dMgpEG_krYqm0AjVrzPCP-auBi-YcW8W1SO2LM_tY6zJlsgjzCPchd_BGRUHXm7qilUD3JCGK7RWIhbshftW7llbb_W6IcPBRGCP50o_z8FF3MMEC0KpJ2T8x-HXLjZHzrkZqT2tX5maVkJvjlIftnNdRuHe1W209q5JcnfKSurcL5JnlJVzIKPHUHTReZeovKZqRXlrBnCVS3mbS-pS2p4lEPZICrqfUyFkRgt37RHRxHTJeQWDpHTiVrNJVoz-3eww5AzACCT6BW_btepWuDxjiBunz_UPyjITmS_abMuM9611frmN7dLxFaw9zzZWqcaY6DwZX1qTx6HDQK6BSxglCYJ0DxFug2w60keyr09L5kOdWZJrpSIP31HMN0OhA-EsYWxbEkArv2imqTaqPnnwXHz5EVc4ktTcKvSf8ACuujmGGj1yS7rhoNjB270_nIS0MmnoV21T8H0DStHV_hw7E-NydnOI8ZYBc63VXX4Nzb4FmBHX_TZZVngdHPyXlgPQyoxpLOJfZVuAnr-Zv9T8kMuv78vcCaiy3w0rTw1tTTerp76Hehuj5OpOoNiRoMb6sPRcNBi1-yPFc7OdN5RuxN1lT2xer6Kjh5os4UZhb8r_NK9P1ymMyK1ggOeT78_Bq9__SN5uH-PWFDTtYS6E_YU4_4LhworvjgvJj9EyixuSr9U-ZrkfCEMmr8oH8Idxqb5otboXtC4D5ZzKCW9xogcXZNlwPHusuq30ZykbaNENRJYqwufsbfIclnQrLB99tRLXHkoGJWLZu8LlBeGiRIecptL2g8_3QrGh2e-7bOQwNu-8s14IcVIUTYMOYt4W8ApzGQ0FrWP-FTfIJNl_LR2LLbJ3blRKBlSKpzJ2cSW8IQb6shopXg3L_ZZCh9n_G3MCMhEJ0hwfzNieOFRZzHtBJeMpkacWsbCV3M51YSMOcLEXcDnoAw0HFBb7Q6gTkL9daBOWGtWe9Affl_uptdNa_4n5mophlGKmgeHR5_P2XBaBwSknNz-HAWFFyh13MGyr-NQJW4BqxRbXypt5wOdXxxsWvrFRxp5RUgAME17Wc5qygZdjcJcT6fFT7H6LWMQHurBT5Th4isCHkk9T3e0q3m-pYYYQfIAAKagb9QAe2OJP4aONUnO_xBqfOceO84aQNZM9g.yF6zU8NqphCOgDI2lN1T5xxXT5rp9-OwYER3KkiZa4Y"
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
  login.clickfirsttime();
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
