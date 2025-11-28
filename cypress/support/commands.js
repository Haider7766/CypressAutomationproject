
const DEFAULT_PHONE = "15444645656";

Cypress.Commands.add("createUserAndFetchOtp", () => {
  const random = Date.now();
  const email = `testuser${random}@mailinator.com`;
  const password = "Abbasi@123";
  const phone = DEFAULT_PHONE;

  cy.log("Creating user: " + email);

  // STEP 1: CREATE USER
  return cy.request({
    method: "POST",
    url: "https://artestri-qa-api.neocorebank.com:8443/api/v1/User/CreateAsync",
    timeout: 60000,
    failOnStatusCode: false,
    headers: { "Content-Type": "application/json" },
    body: { emailAddress: email, password, phoneNumber: phone }
  }).then((createRes) => {
    cy.log("Create user status: " + createRes.status);
    cy.log(JSON.stringify(createRes.body));

    if (createRes.status !== 200 && createRes.status !== 201) {
      throw new Error(
        "User creation failed: " + JSON.stringify(createRes.body)
      );
    }

    // STEP 2: FETCH OTP WITH RETRY
    const fetchOtp = () => {
      return cy.request({
        method: "GET",
        url: "https://demo-ids-client-api.croeminc.com:8443/api/Users/GenerateEmailConfirmationCode",
        qs: { email },
        headers: {
          Accept: "application/json",
          "X-Tenant": "Artestri",
          Authorization: "Bearer eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiJQWFJJSERWMlJWX0VGUzVFNEpZT1Y4NDk3Sk5XWC1OSkVZTFFVTVNVIiwidHlwIjoiYXQrand0IiwiY3R5IjoiSldUIn0.mWgAnnXd7nUR6VaCH30zlVVsVBK21MlMi29r78_WpWXbNu1gFzJ4vCQtfHQ3aCEw0Fxb6zQGPSrDcl19XkySZbzr6RtDhg6TO_vjG0dZ1fHemkYBrgluJ4PhwDOdscqmYv9fg1emJBpeITVYFbddGVAE8qF_ksgSU4fdU8E1d2r-R4gnzXFerFyd3kz-W9sRYfcctJT_PuPpJgSZp9PZFFUHHsS_JoZPpT5kqZ95sAI11sLpjzbCfk5vpBvg3VwTb6Au5nd0HrhMNp_KDkQU-nyfj8W5EnmtomeWw496NYfXVxOnOXw4ZAhqXynAixYmvNcTtzRFsGRQhYoIF-qsKw.mdEUNhVukEAO5jjBArsaZw.t5JMmapp2VqRWPGc-NoU2rTVd1SGnr5Zc1uIwmkCvli3LCTsIwCt_lWnsDCWwCFrB1tdgYwFUF35piV9C0I7ahFezN_XC1KIn5ottp7rYErgjKwVVTLtYLAiBFs8P2zLhi5310rYJ2RsbkeM51bHO__Q6EBdYZWQcBUDTjE8G2uMQdpOn8bePKlYMQlWcnkQImSmC0alHD5-4HAX242eFIpgqecdKG7LtDi7vjvt-5WoJ1TzzMuYChd7B5C94waxHmrOGFp2F8xmDUzRmwFlE63GHDOg_h9FeJ_zak0Z33TBPUbNt4TIPKzdVqJRoTePYJkbnsTp1yNIg_YsvD3TD2p-XFPtLfDB0TqmsXXz29NPaGV-9JL-c6aCS8WUAxSY9N9Let462Jy7AzkEqBCojHp1Ors7ZGeFAelWSXSSGKrBcG3832ci8WMFV1VcaZzKGzZwSJynTqgHqOxaXwd8vEeLsOuypba96ac788RSq1eDfdnH6uTcYugTFnV8E248rPKocNF-x7mTgnQziD1mp41tEuv7NxIARxp5ieNDT72aXSYKE8OU-CTmAXBE7l-g49g5YyAl3TVogH_Vda7NxO0MwJtd-p3mtYwW0Q3A69bkb9A_lmA08rjWzrAgOqnEj-lYpQpTcJ8EW2NN8Bh7DMarX6j_9KvUyvOStj93W_40wL9N_22NFRt4aVsZTeYEttPu5qIdFqtEsp8ae5rsAkUiQHubzVjH7tMPY0o96Ed4XLUypTzrR_vN3YGjGBYmxTMemp1qHelKn3zqmtaOh7D_zPME0v-p7IoQso9VYt4tkFCNQqZL3PCjWqUgurUEbeeB3wALPUH4dxRE9ZkqmnXk05XmNy7V_tUKJ9rg1biULLd_FkPmmyIDI-mBpzNAcQOI4kFGoaIyw4JQxiaZGQClZRmbAcAF40lWK368-IIJwGA5rkMdEdRCmg97oKCpEGnfnK62FF-7scx_Shmy73YP0STrizpy3jKeh_oPzVx1ArfT43ZW6oIJmkvDYVIR_H6U5UI6hoTAgzXh-U9fQg1dVpFmy2RfJTUyCqzstm4-6T139ScKVVFGkQUhGp-EkuvAg_aVXrn152hzgGiAGQk_iQvS1isNY59unoep5A6GRSxvmuSuxM6pZjNghw_woJ7kmvzCbhgB2K0skYsEC2FjFEATNW-0ku3zEzx_UumrsVcWGxzVUUrlWDQJDUAi9oGNbA1RDBxg5rPrvEpCDC0gjsERL9fm77-iPMY6XI-FGfG55W16roiV53E9HiubgAsGU0kbHqWcRA0cXJBoQlr4NJu9ek5Dqt6YAscmBxJ5a_k1cYvB-S8JGet08T16Q9iOGa0VR3tZkXiKQS-618XZWDUWcAztV7GTZAzTFYkq_FSjB3ZN8LXBXbTXikfD_DNhxdHer_sByatNz9OA1sRbNONVdklW7skqu8DZM6VGAi8LuoogJObTahD_hMw9RuyXvasj_ePviEfmdXH2oc0fyOVM5gkkS1SYWFiSCIA.yX0Drypp6pIUMQEPLcjuqkyO1uhjjDySblZn5PthzCY" // keep your token
        },
        failOnStatusCode: false
      }).then((otpRes) => {
        cy.log("OTP API status: " + otpRes.status);
        cy.log(JSON.stringify(otpRes.body));

        const retryAfter = otpRes.body?.data?.retryAfterSeconds || 2;

        if (otpRes.status === 429) {
          cy.log(`Cooldown detected, retrying after ${retryAfter}s`);
          cy.wait(retryAfter * 1000);
          return fetchOtp(); // retry recursively
        } else if (otpRes.body?.data?.token) {
          const otp = otpRes.body.data.token;
          cy.log("OTP generated: " + otp);

          // Store for tests
          Cypress.env("signupEmail", email);
          Cypress.env("otpCode", otp);
          Cypress.env("signupPhone", phone);
          return;
        } else {
          throw new Error(
            "Failed to fetch OTP: " + JSON.stringify(otpRes.body)
          );
        }
      });
    };

    return fetchOtp();
  });
});

// Reusable command to fill OTP automatically
Cypress.Commands.add("verifyOtpAutomatically", () => {
  const email = Cypress.env("signupEmail");
  const otp = Cypress.env("otpCode");
  const phone = Cypress.env("signupPhone");

  cy.log("Using email: " + email);
  cy.log("Using OTP: " + otp);

  // Use  OnboardTalent page methods
  const OnboardTalent = require('../Pages/OnboardingTalentpage.js');
  const onboarding = new OnboardTalent();

  onboarding.clickStartNow();
  onboarding.enterEmail(email);
  onboarding.enterPhone(phone);
  onboarding.enterPassword("Abbasi@123");
  onboarding.enterConfirmpassword("Abbasi@123");
  onboarding.clickContinuebutton();

  // WAIT OTP SCREEN
  cy.get('#otp-0', { timeout: 80000 }).should('be.visible');

  // FILL OTP DIGIT BY DIGIT
  otp.split('').forEach((digit, index) => {
    cy.get(`#otp-${index}`).clear().type(digit);
  });

  cy.log("OTP filled via API");

  // VERIFY SUCCESS
  cy.url({ timeout: 15000 }).should('not.include', 'verify');
});
