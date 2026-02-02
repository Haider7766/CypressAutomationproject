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
      cy.log("Response body: " + JSON.stringify(response.body));
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
          Authorization: "Bearer eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiJQWFJJSERWMlJWX0VGUzVFNEpZT1Y4NDk3Sk5XWC1OSkVZTFFVTVNVIiwidHlwIjoiYXQrand0IiwiY3R5IjoiSldUIn0.o20St4Mz7BSK0Cpsts62489Yo-Z6u419zIFoRm9dGfVUcih0nLu9R3hYJHjSt_KShW5w_hMECqM_ndW6SqW_CtEUsaIrQcISiQTHLd-l51INk45Kx8bAIdfcHUmM12zo3vnfNOQwS5ndfiMVTPUZiABZK6VMLXLuq16qgWTSXkrxJ0Rr9nN4gieoUTX5m1zYFvjGGrnaYzKzqKUDpKumiV3ZqFpHOgCZPtQ1nu6v0BVdnpgcmVRzk8zIFB3KdszAb4uSzn8wKAWlrMVZJk1zSo1v28J7N_xKzLvpyYMt2mTajrFFDgTngMsKJ_lxfGQ_IWxV5JsK_iX0nvnlSHBkiQ.7CtFAKdQyLYk6Htbv13VqQ.n90Nk7aYn1wIPUaqdeQHE-UqtGJZPYr6K36sS-aKUHW8rQTdwAVXGaB-Y_fQIZcrrDwZpKR8uNCi1MaJkkrWS2ocewpcO0WUzcTC7hq1Wu7UYNFQXuknTmW3tctCJwb_MItnh4fcTgPlM6MivIHioRmNviGmePrME1fltV49jppAtuRyjgzeFKaMtGzwrr5pZ05TK00ELhXF2xKHozejtzg39ge5mdFXwe-0SBei5Q1-7PUPfu-LKX7_b7JetzRSXo2kA9dI77VmzQVbTS4rL44IB_UROr1XyfU7tKnIGWhTsIy-bzW5Cy6dXya869nxqct5uS4You0W6B3iSZVxvimqrD44aDgVdbBVRk5ijrN9gkk1-5bk0Dx6qs9_hhFwVcJkdFz_4LWgS812All8vnMoHDt4x8fqzV7NN5k7KsF1unPokF6YCLZNKlnTVNsrs7fZsJhMl5_BeHetb3OQS9lE-FwbyHAquZ6WXs8gMMSct_ymeiuiozqk0jpwPwYmwgTqZ2ilM8_esaU5PGDL1qtxP__jE8LmmUX-nzZM1oBnRjhhewIHpHqAjdiKYPXHaOC1_scDK__2_EP9MQJ6pDb_s-lPdeLLWPEGx1eciMGBbB1p6WQ6yssNfTrCjPjjw-HD5RoM1Q6Lnf5Fc-Sr312GkN6tL-Yh9lxOHuU9zO-yb18McK6gyk3OAItMl-cYe8Zz6j_nhAp7KfSp-EZf1KwhYxwm0Mbk9h7Pee6A29aPLu_EqafgR1cGeVh2z1TeL1BH4ncsMZ4O8WWXOG2_WUGBz7S54O3kVmP4uqXxf7PlNpvubZ-9oagl4p3WBiFw-Z62sOxFBuW8szxJ5OUYxJhq03wza3W3WUHGP8rYp-doZX1I0AqUaud5oBbQ80Iaporpf1EQjl_L3tE3nhZPGwFZRY9h7tjuGQWGyNwErjRJhlKiRHRJph93zvXBiCJeOL274HcWl9PfmFIJm8Qeq_iUaz3ZvHADN-3afAbk5UJB6xYtrAqDy-eIjks5UI-patFvYi72KezYwlxNQv6o-68xj2X8Ne66GISqMiiJnBwmHOOEuLkbCrjzj9DFw-qn7qureffiib8jE_fkHlTyVdCsU3w9u-U1qc_t13xCMnLgyjjH_I7SJ28CPPl-ruAZCkazzQbuRgdp4GOq91RfywpyV3n_iurVnGb06j9DhxjmTpNkCKlSbHj3nX-31lc54KyFiamcxtKD_P7ict4fo2Y3s374sByLnhHVIzE5qWR-1KL0X2qIll8eBVJX81GP0nSmnLJCx1qGQAsb7Da0TGdpFoH6N5N_NgxThsOO3bPCW-EpSeXPl48Bwyrg6cELEyOvysCQhYJjRaBYq1SCn3RgtSNlKSVRZUsiPc1l6uh7U85bp0kQCLHPcae2LAcMB09uShqnF72ZAhvpp9PbnXRUZwMFnFLTuQKl2uQSdvI7AG7_YvHuDVck0KPdJg0v0KMxdNFQHANVbP230tKraJtGTCnbI3ctWzWhy4a9F7s.z4j3NEgbndNCpiIBJuOfAKuffsEugOeSJKU-ZGNdeZg"
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
