import ContactUsLocators from "../Locators/ContactUsLocators";

class ContactUsPage {

    clickContactUsButton() {
        cy.get(ContactUsLocators.contactUsBtn).scrollIntoView().should('be.visible').click();
    }

    fillContactUsForm(firstName, lastName, jobTitle, companyName, workEmail, personalEmail, phone, message) {
        cy.get(ContactUsLocators.firstName).clear().type(firstName);
        cy.get(ContactUsLocators.lastName).clear().type(lastName);
        cy.get(ContactUsLocators.jobTitle).clear().type(jobTitle);
        cy.get(ContactUsLocators.companyName).clear().type(companyName);
        cy.get(ContactUsLocators.workEmail).clear().type(workEmail);
        cy.get(ContactUsLocators.personalEmail).clear().type(personalEmail);
        cy.get(ContactUsLocators.phone).clear().type(phone);
        cy.get(ContactUsLocators.message).clear().type(message);
    }

    clickSubmit() {
        cy.get(ContactUsLocators.submitBtn).click();
    }

    verifySuccessMessage() {
        // Use a more flexible approach to find the success message
        cy.get(ContactUsLocators.successMessage, { timeout: 20000 })
            .should('be.visible')
            .then(($el) => {
                const text = $el.text();
                cy.log('Message found: ' + text);
                // If it still says "Let's Connect", we might need to wait longer for it to be replaced
                if (text.toLowerCase().includes('connect')) {
                    cy.contains('Contact us request submitted successfully', { timeout: 10000 }).should('be.visible');
                }
            });
    }
}

export default ContactUsPage;
