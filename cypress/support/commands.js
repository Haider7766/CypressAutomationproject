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
          Authorization: "Bearer eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiJQWFJJSERWMlJWX0VGUzVFNEpZT1Y4NDk3Sk5XWC1OSkVZTFFVTVNVIiwidHlwIjoiYXQrand0IiwiY3R5IjoiSldUIn0.gas5iTGastm9bG7-s0HER5Rws5ksqIhNtt8lwe1RXtMLBebqlHDzMWf0QLIOUkFXnR_PR4x7EhbWBNQqcgbXrabqwP3KF6IJWHoRXvZJNyzPqj4JoMZdNnFfRZvoIsp508d9ITJJNCEkX0MdWjSfzi9q9Cl2Cc14M7r6hnW9tAejB6S5HhPD5XnfITv-Irw6q87acWh-Qa2kMrlJXvDx3OM5Qz5Lsn3kl-DPn8tzwDMVV9GhlDfH27pMlL74uNyYvhMhWktT6pkOcJ7s3cbbLXL_xyby1Po3dLjazjz079kNp1gAk8BG4ifnDmVT1LWOO31RSncIe9kWlPEv2C3fxQ.Kgsbps5sxaTiTgM881AoSw.fkcG3y4fSEHGJ0AF7vgQ05LTSaTmhy2oGS8gbABm-cStlJORr1O9I3av-OrzVQlWgDhfFHfvQajK8NONH7jN_7NYdJSkw69ERMut73spiW72Pz1Hhbv2HyNk2yW4EhAeVueUWTuQ-OVXP8slzHkqExmKgWYmP9P9pTB0ShRmbxX8VluT5n45izLAiyLOyOdkf_Vtki0O0KMCEoSMvECGRfGzqxu9bVIXEXvbYwppT6ivila6ZD46LApq865wjH7BbxOPcaeA82JPwW-8pRTw-ewSpR1YiQowWPH0jumcAU5z3BBsDbpaf1NxRkp79moZh-1FMx7_IWEfHkcbu-WIY2pfsrbRP8izzug05-Hh9ybtmYn7gwO0Gea_ByXrw7bk0aVA_1w6-pDZidVuCze6fpsWuEdHDMb59gdZ_Wh9tUxxr9SMtRYjVRfvbZg7QISrgABVCNyOsEnApizdcxtBa4TCfvv-acw-YAujB_krNJR_mSgNp9bKSm_jMcSEroFC_ARrJRIYU9v323GziLwstBaQFie1DHoWCYrP1AO14tl23Vn4VgOiQPJdeeCjIh72xMBwAW7C8vxMO6aJ0mSuhGYn_4l9s2zSQj-mi29KnWK28t84X0SRvwUQ1P44tRVznmYSI2Q0s0lE5XmhjBhRyFfFnA43nJZVBDwugOkT3ybP0v5eD-Njl_2u1XI5vWsZC8reBPMv2LkUKq7mjut90B0m3RcHF0J8JOvIMrihmLcz5-aBqXjLPVir7ijqZttUVHCi9mWO_m6eP_VpGxlt5ZdUrWHntuzL-WXINRXTlbcL9R9aECnoopO2Dsb9RWGTGSaH9rluqBzubBiIAzVr2xL3DAmBblvLISa4uQEIXzYb5lbR-GWP11pO7tq2n9TmhqzIX-Pl-JqXtzXxgdbsDk4kkgX3HmHXYzhHV8Mwp-LWdCzmrCmk1TlQJw9asbzEFgCXImfbZ3Z_1FoIw-4updMxVwhL-YqhmSoNPl_0M1lIAOruiuO67G_bX-W0RirXCWmiuuFblwAbzjTfxd8P0QYrU5c3BH4-GrTcgOKCIP2YKNppadGMtqC79PpH3gbm05C353E7v-kDTHZm32R4sCxST8WsyO9Cz4MZNYNgOER0zBG4YeEHLBkX_w4Iq756SbD_q2YlojvaXnmX9FXbkyULfr2stNGuhbxcGt2Cp2xhdLqjJ6ZFN5l8JWIQvBmtXP9V9E4wdoMiRQ0JagXNYP0Th7-Qu2gu1tKxAAjWUHVqQF0I_JraMUobcqhrEnbOBTLo76uEi4qg54FUchmUc7xssXqIIiBdJ1bnvRm87VIMEu1MY4ZsriCgrGrGiKBUj_Oe2i_4W1GvoMzMlrMslcPPCU6eyIBltheueO85VcrzXAb9HhswgyWuJa6zW24okSDCocNKJJvVmIXF40G6raGKevhUAiD7ufIWERdyTkgIfF-HCKvpguNPy6BL2R8SDvQJldMse9UqLW3N_gDskqw-QS_CVEJkbHJvxcrk9Es.xDFI417_2Q9EveyfQxfEdx0FUOcJUFcXeUeL0YjQDbU"
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
