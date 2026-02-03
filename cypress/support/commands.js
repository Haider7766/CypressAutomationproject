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
          Authorization: "Bearer eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiJQWFJJSERWMlJWX0VGUzVFNEpZT1Y4NDk3Sk5XWC1OSkVZTFFVTVNVIiwidHlwIjoiYXQrand0IiwiY3R5IjoiSldUIn0.ZSmBjuQNhz2_wc2LQlM4AWvasOk4EqkXtIrJ-0CG98YOPDJQ039JFMSPoaQf5zdvZunUWx6nGm5cVIOKZCWlc0tcuA1dMLiTsksg-st3evvTYcRGgbv-3VHT1JzGuZeT3u5u0FpY_MhCx2Ey5Ts35lRVrCy47hh20yFEBs7QFRRveEgq5RVGUuHpxHCxJJHRAoq_sbdtLdgmbQItsg3HT-O4hqWY7N9NmbkbWKyPe-1layB-zcF96I-AKR4nNIYMcc7t4jeL2CYKq0A-2EbdVWLbusJw_x3pnKCJQlUV0-uGj8UCtqDLwY_m-ocJqpDg3MjOyKva309X7AfYHK9xcA.qt-LOKPMurWdjP2lkmc3Cw.iQAAyaOpaPGEwyaA0npHGIxICqoNja_2W5Z0Rhcz3pCs9voH73b6jHYVYO_vtfXs0AdqTT7ec8pqfHguVfYz0c0cjOoc8A0wQAmubrVP9b6-RZTl_VOCWAij19gPXRU8kdmGo8sdB-93MuGZ9-GR04APBV049-xo2S9e7bj7NzSBXutDiF9emm6P5nb0a7uI-or3xa0x1Xs-chl3kqs-ykVik17qLCl3tp6PC0ox3YvoF3K-dCO_HXGMjUpg19Pa_Igh1HVUqJoTr-FQm3iVFcxatfo06BxZe2AMazx_eYaOMAMde_YsBfYRv_cKorTQWYsyleGH-0USj0u5ZfA4i8n9A_XG4qqRIZYTXZQXAMnGb4lE_eslqAohdcFi7fDb9F7JVnocgyYVFRMX5btEirqnvnx-UoyruQhfDwnTJpPgZlbfczOvgSGzJ-hdX98YyNeXDB2fkrjvX-rCJDWQ_I-avPP9At5Z9SKMc58AJ2H4VJ5ln1R2x4j8kAwN9G1OqEDKr5NFDHPsEI0t7tFDAJ00ynDMYWQ_HyNLJ7wldwOY7pc7QcUx7sQSC5Ygka2snuveAvQcLr5VO06NnDG0Srok7KVRIQgW3JfYXsc74DNAo0UTWcC_Ta7raoUEHP0PQVKlVRkfd5imVgPgrSwAsfbZ2q9j1dN14iQzLVcObvvHoKgDR4Cwpf0kzM_Cp98NOdVfNMrPUcvH1aLdoC5T_s_MHrGRj_zqAydZ4MXeMsacUhuCc4peQopMZTOiyaXLQZjFhMb-LN9vYp_jsZACNF6HImsGCE_MPi_li5Nb7XpqdHe7xf42zhIYEgLl8J0BZRmvpDfhigRnTN8zEwaugrjDuReCY6E_F0HghbYYq_lduA9436Mf7MOtGwGczpZLINDEYd3y5SM70V7dVqWHrBmymQ40xxHquz7grjKHKOAwlWzacgY9iaF50kfHKS6Jr3A1rcZrA9_wMItxBrZ1I2fVq_VW4mk5-rLTOoixWnO1yfwZmTMcBC3fY3FCRppTKafVULf358uY4okDxTt3Q936lwygLBIAYt8M1_4JtG1cKT2SmJDzv7STrQJVeGEAFcqw8Vw2L1eyhDf4WvZ9whK3iA67WZ84_5JbR1IVJT2l9Gac_GW31BwM8JBKcw8QEOWSAaJ8Zg4uVDRtjT4C1Ykxx8DIEoTkkM-6WjwZsRc0lTu-rOqJWrf1zEvp_p6BzBDOr4SP2lSybdiIVi65S-xFqNGQTPtCGZ51K4YGF5fMJ2P5ZO660xDlzvEWtEXzQ4gLCO6KuhbqxHvR94PZYdTw-Z9p0kQm6xbUDxMrKq3qdPgBduuu9l1ZTqTNV0O9pLsBMWOT1q2xZGUaOtHCCRjvQWVd2X6OwE1qIkYPTw-536dFIohLKTjhvVDGPSI6O9lp3-58a4BSMon8bzhI1IxjAtRITOb5xQfCRijuzy4ZD3-5EtGqL_5l9ht2rXk9cqZ2Kt71MxykTgch78B0BVGUZcx7OKvGy8D_0CuKkdM.fnZPQXgKPaK2auItAKSbM8Agt_3AUqCemkP-2JMO5lE"
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
