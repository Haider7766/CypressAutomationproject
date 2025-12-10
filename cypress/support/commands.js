
const DEFAULT_PHONE = "15444645656";

Cypress.Commands.add("createUserAndFetchOtp", () => {
  const random = Date.now();
  const email = `testuser${random}@mailinator.com`;
  const password = "Abbasi@123";
  const phone = DEFAULT_PHONE;

  cy.log("Creating user: " + email);

  // : CREATE USER
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
        timeout: 30000,
        headers: {
          Accept: "application/json",
          "X-Tenant": "Artestri",
          Authorization: "Bearer eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiJQWFJJSERWMlJWX0VGUzVFNEpZT1Y4NDk3Sk5XWC1OSkVZTFFVTVNVIiwidHlwIjoiYXQrand0IiwiY3R5IjoiSldUIn0.ft59PIRjPhWAOR2N220MwXLIzDusNwEQIOA3zdE0FcvFlpdgwBpzLmiCNZMqNmFgoiblbIkaMU3sSuHKBCqoC3WCPyhQYGw_8D51ySsJHUL3U-EgcjCVUhBSLTzS8Vfv2pDaWc0MS7HGr21EN-a3alxTQkIcKJCbP4GoHA9Q5VtnNLIRTZubnzaWpiiMk455kC9RXgOd5OaF94JrWu98EWnzArSBfIc76MjRnFcSBy1p8j5NQKgPtMZv95TzfKavGNqax1xcTuXsOBt2bZnqVd5hArBdXsZ6FEdJ38pgcidapA8QXVOIieoTQMY6BB3LCHGYHnKLL5UYWCbZOSt35Q.OzkHEoCGXJrHcDkBCSMpVQ.yrr1AfL8k-GPeJA-C7WEcR6cfUmVuqd62fAHaNZdApn_LlsNJK_eVqiRKgx8_1J8q6aWqL3QppZmISMv3sykZKusKhIKak3VAyLhT5KNcCJhOPf1gFMUQLTaVA_DevW7LjPtW2So8gvjeB6xO0Jc88I9lK3x8-_nG7aDsuSuL1pTpKbgxgFVuL_5KAS38z3nSkLkieWa7SFbuVltIXnuWqXhRMDA2ruJaC-7kWcJ4Vg92yVEEh0nBcai1HwNf8Fdp8ZpOJlGMsWJXFnKkG2o4tiQsGKfKUwjXvpXBXvsimODhUqPQOB5ItZM95V5gUSc8hp3huBqxhds24Ggmg3qlDb1a7a1txjQFcfy3XmQ5YQpEghJH2wXlFyVIqgiUnvJBxp7QX6ssZ8GciBxcRv0WZVe0_BCjNBWYkT6Pj8_4QgFJN1rGvI-iBbpTqlQ76pftyrKlDpjB3iasDOsKiejKP4OWxh2TBJNl3ws142bYYGzifpikVfjShcHTiBp8doURlMQczUojnZBTbwGAbSIQ6xeoT_wKn7L0JYGRKdDRwiXsXRH-2a6NiFoS9UuA83DEelh9dC4uTTzNYZiD1HijlxqbGN0kVjzqeq37ZxiEOnqEA2rforB0DKDuIvJRN_Wo_eORhXVijl8QufNcl8pYuaPPkVS90O47wYUjYUzeRFLkoZ1Pq8TSAupPOKmppml9Wv5BSmq4osub0OCcNQCV4bQCELyMh4TlK6VjGgAs213I1ORGnCZ680_skh3FVPhV2BWdX6OHVCR6t4AE5QbecJhMqYsYUHKytp8IGR8NvaDXlwvlRUadSXcMY7vU6tkUPS-mD-0xRJFumTzOjgTRx7ZDNiSC-orFDjvHWyzVmiyzwbnG0_aspnX33qB3Dhk5k6vdF6kFQktv658wX4N40Mq0GHOdGJTVfayKqP5gMXFQacwGLRSOpI-2Gvp2rYN5CtueqKcNcW5nhzpvJ6XxIGG5n17AlgSwATG1uByGQajW-bDV5XJjryE1vZ02Jcd-5N-NrPkH8xmsKsqHmAeDXXQBX_d_sTnUSH9aJJz0Gs637h75qTwuEk65ayHg0nGZKBo49yEZA-nqvhrK9OIPuWUxbF84FCCCj0KXcukov8HxlQGBBOAsB4Hp94rmy4gUom-dq8iN53KMuLPwYMyrV3x_I9U66G2S7w141G8m9WejWABwoi8poOT9kBgZHz9SKBPymOtd6uwR675CJGhL6pLlZ_1ToHeNmVfCwNlje_fDAZCfXNCVSByFFI9C8Bc8GVjnHDlTuQXi6lzpLkYdkt37jSxOQ4jVjuhPV9BaK9QV6JA8mukHS5hS9Et5l0g-IxKsBhoa314C76O8z8psEmH5ttduicZS9qpc1JiqHRb9ZddwePNlIL6wQQ79NAGrsVMBUvDbAQkmfXcYfknd_aNC_Oeph5SJWk1RyTjfn2twhDGKr8LpSmhn_vodDv1MxwpPWoMIjD0p8y-JpB7Fq0fC_imjYXDt7VsFeYLzpU.fTYSeRoP6XejfGKHHKzgd0aTiS0uUq00hnsGcuX6tsY" // keep your token
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
