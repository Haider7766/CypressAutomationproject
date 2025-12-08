
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
          Authorization: "Bearer eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZDQkMtSFM1MTIiLCJraWQiOiJQWFJJSERWMlJWX0VGUzVFNEpZT1Y4NDk3Sk5XWC1OSkVZTFFVTVNVIiwidHlwIjoiYXQrand0IiwiY3R5IjoiSldUIn0.h8jn_V6Nf8bH7baG9k8TXaM0hXzbcUhqSZ8i-jjmq2KJspWmnvBsK5284JDHvjqf4WHevgzO15-emYFIFrObC0gpI3Ts_TK-buERGjtX9t8prI2zo6TQ_7S5hLcA0l9TMJ1p868WDp0LsgoS8NHt7VMDDEaTc7eUYCimIFBMNu0qEupAWiY9WZla8YhJ4m_5DNTVfj1A98eHhg8eBdFkDvUlJ8sUao-vR_iqEsQB1_QCyZI8pjCpmwmJiE6v4A48ifd2KdHJry5cHOO1qXQnES6bMvYG-z3J-e5sAHhfUE6YFAU_L8aLVcJQIhenhYOPB-EWkDm9k4qh7--WWPoYYQ.RirAjvXoIhTjqqjfByX_hQ.9o2x3K5gIoWfzerxm9UKhPBFuaNPSlt7bRtR5k4ze1OyWg5Biji4A7cQNXDoyi58t12xlzkWNgethgxEgMNhVlSDJ0g2FjPjeJZ5_sPkGMrxCFL1lRMXYE8t3ro535gfV_sxuBwCl4JqaCHKhVUNnQwMStKQ8IvuBMSKncZqlXG5eLyyZ5e29CeOO7vo6W-x-w2mgwYUx9g1eVtFPIKcgvLVQCAa0AcRYL5AHRgiD2uOGMwi8NJ7BlbGwSXdPhQZjgE2J5c3gzoR3PivgBbB1A26Og_xLtJUxd1wsYktEkr9eZgEdPnRRezQXbRdStQ8eJC4fO99BbrPfJ_0x3uY8ZvhbXrjl34krysb8r8IbYkvLFNSy8LEee9VOU6WHUOjrNaerua2lWcHRbUrFl65_J7jZexrGcnLiswMwuW1UYjiLVfGjGMs1xLmfD9VfkOVkE8M6xnKKmk81BYjq1PPRAYGLTFsk_0oqQq8V9BBeIaV6HOF6Cgg8q24LqcmLK4xUJP21LzvpX96npua5Au6-YuqiR7zUr4gTdZeySDnG30vma8Nvg3vA4s5sexeTqAo5lyLJbKX_IO7BLTGpvZO4rxx1Ejpzae3gZJvTc0Y1_euu3VAcZHIojHqj4JjgC01Rh7C74LtdD1bw6L6ZOCvigQOTOTuSOb_S7b_ld-AdR0G8HhdKi9CJiv_QjcezAUZzleK718fRWugoLrjtoxCI0OlkHUv8KlA8he19xBnPjHLqVGRezwsGMGRtXDkJrx3BFs8-QAUQF8WAtVSz9dFYpZYSN08Y2eoS9_SlAsEkCZ8iZoP-WnrILcft85LwGI21dwkKxndr1I2fK5QLY25dzDP3YfUpOz96jGfYREQ5DmltRqWS_yUrgtovEkuom9AWEPPdrKUB_Sd2ev2yLg24QzCbiuoPeLMjgCLGs6LRvdKwJys6LRplZHcmqUZdCUttw9SOC9sYL_lNzCvt637-uypJ3g5wOCXm8iDmYG3E_K89QHwy9MkdnuUEhTCKQJcB-JfKXmRZzimm-sQXGaUNeWTTYainwYmnPP6DDYLdumMJuX1bgeOAmdqH3WuAb-y45fS-9Zsq3lW-NKewHdhWpDnhOi_F5HIo3oCUJEd6rQlk5aG7CWz0muQsqXcld38pttXL_w_6yqzvZ-MmC6PRKs_jM2JeprTrOqsIaLlcRguKh4U06m5Pa93kkCP7S4LpFstuuYsEGCd2FiqyF_ezjDSNXfmdfoRoigespDF388YsUL54f95XCcaxLUWsWR7pQkvor6r5uONykCXkRSJfpOwOL28f-0FZFBSTsFWV49uvXw7ECNArbD9oyjMF16zulH2Qa9HPp_2VNoGbcQTigpAuBnNJWSIRU1O6-i4NV0SdRGdRu_YTNx9o1-3rZifAZXOkSXUN0-gwuY6F0NZDxRAOjoisy22xAtgeAvwRFWOktFI2irViQxaT4O2n7SYtkVxIYIlpoYsOOKYhB153U3blNvCcCjOK-YuqQ39c1M.17fs5mXGbBSDYZHHNC8l9IFb7tKhX7Ab8kguWbo6_6w" // keep your token
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
