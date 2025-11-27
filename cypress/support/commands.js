
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
          Authorization: "Bearer eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiJQWFJJSERWMlJWX0VGUzVFNEpZT1Y4NDk3Sk5XWC1OSkVZTFFVTVNVIiwidHlwIjoiYXQrand0IiwiY3R5IjoiSldUIn0.TOoVtEogy8diGpnhrRT-H-ImUhaIwIEcHXUdot831QzW0SaKqPnDex80u9TseAZgHUaYZdgwcv2yRqlQtXvxkrP547A3VdTqUBAtVWYpvCbe5bpNfqJv7I2z1UVna-GfwlICttRXCbZrF0XY0ajrI-CO5S3WB7iuo-v3p1ECMAHve5-zCeEHV0qyV118a92x1-AQXBN64BQAOdDat5-h6NLtBbx1JI1v-Ipq95pUgyeytHsjNxRY5offNSP0SWsJbZmt0aKrwmkfGv8lyNgbpZxS6ltYJK0LpOqeIbTfUYTkVP1BY8FbLLFqM7OxBwnWdNRBKEkmg2XP7UVuuYVyIQ.K_bcjt1GjZbU1JJMsoNVIw.CO05dwZZqvBIJFm33Hagg3Ba-PhvZIUclIA2obUbSIU-ur4Thvm_O1jN5Y_97v49SdO7XYObtUJNGg_bH6QTPfDlS5Ido_KNFdZVioRxhY6LcN76YcdPPg2Zz_VJ_yNLKtE6LlMpRug1xzRpn-L4m4Dn9DANvtqV5ytRfYNNiLhVioHwU5TMwoYJy7obYRYz-oEVT8OMLdNFwsZyyQlSEOjQJS3FPaXGIYPOliRBVUtO4SEbYGNYoB8-ZJTvQ-Gatkp0Jc6XtJCn9cK9oet6Tl2f_i8T8nP0nC6UnUXqP-SLGii4qoJK-JZJnkH2tpPqn7AQPrwVB2WT47fhz7poKWQm6eIvt8AIYeHttxCw-Jdxkn8QTEtGJ_uKbnRxGakdbPHHr1xGoIClwgh7EmvylNk03CVPyWJ5bAiubTaaqvImk_2kY4TSMCMLOGLUPQXhCH5ZUDa3zqmjAU-eEUFKdyCtpD00y9qL91bu-nP0PI_KQod-mVuzG6HzVN6Cy4_QLTGSQ8t7uxzFTwWcSiJQSAwQcIy2VgrSqU2SEebkwGeWWKChXssOTj8dR8v04lZih8JfrIlEXSv3VMFZEMcQFleD93Ytltn3pGSqmi2cYXn1OO9shEnO1Qt6uDZnJpoNJ71ybZBL_7oR6vp0ldMCUpm9wVG2yUOL2pz-rQDOyJXaMk3TKJqIF7yY7KeV1pKqm5vfUbvw2IcN6TeBmiOwWmEn6lBbaGAP9xfbIoKRK5cRJ5OLOeRYcno-mpLK6KQ62acD9X2Zgzzb1XYBSqCSUH_vmBuUtBJmkddlfjhc2t5zPLybtu8Ts2GoAVwI0QzQm_B-uXLlepZlzO-KBufqpcj0L4NiUN5hFIn6FFNe2S-vpZ6_wmOw17j3XknJWgnSOj3ILP5gWNNqaJ_9Rnes9qWwwrV-HLLEGJrIVY27Q7XhOjEWbqIunSC8NQ1suJs2OKy7lsTM5zK2O-_dlATcCIxdXb5abn3iCD7rxq_2c65wG7OXiYzORhc6YgPaHEY3JEAs2DO8d8JRsjF4X4Vg0nLAnBVLci6L6fLY-FzK1Tu8NeAwSxywiKo9BoIBeVdF4Rv4vqBCzbN5zDb8v9Eq1guxWPAluiL7jvvTFDvwrV_jH4UWuAqsBE-oYcTDCKnuMkTr1k2YzxqcninZunuKCcdlQhv0gQmYeqtUvFcSDvF6DrIn4ev1uUjVhLF4470XA8Di0NmRRcJbp60-Dljs0N0B-mgpFgC6u6na-Vhni89C5mAoAljkw-DpbCxSJaz0Uk5sS-gKFulR5PcdbCNH2aoRAKmy4Rkevl6aAyqiVqDX28h-77SjbD8-b4E2IBhrDtFFJoRnKfT8UQnphhLfYDs1wdPROA37chJAHBoMomLvAfWMj5SIouAZEFef_1bXsVyFwPVuLVgXLJZb0u5tnpk-3aEaj8dB1iDn0RqpjbW-q2ZGQ3pcnYY0KWcPWM8XaGpnkWwgPk8ZtDveC4tgzscyuoLPlJqMm8tjWJqDEsI.wjZzinnqizCoZwfOggXqdDwsGKZgRx-FpEDLAc3DxZM" // keep your token
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
