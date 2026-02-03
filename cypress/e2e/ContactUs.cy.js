import ContactUsPage from "../Pages/ContactUsPage";
import {
    generateUniqueEmail
} from "../support/dataHelper";

const contactUsPage = new ContactUsPage();

describe('Contact Us Form Automation', () => {
    let contactData;

    before(() => {
        cy.fixture('ContactUsData').then((data) => {
            contactData = data;
        });
        cy.visit('/');
    });

    it('Should submit contact us form with valid data and dynamic personal email', () => {
        const dynamicPersonalEmail = generateUniqueEmail("contact");
        contactUsPage.clickContactUsButton();
        contactUsPage.fillContactUsForm(
            contactData.FirstName,
            contactData.LastName,
            contactData.JobTitle,
            contactData.CompanyName,
            contactData.WorkEmail,
            dynamicPersonalEmail,
            contactData.Phone,
            contactData.Message
        );
        cy.intercept('POST', '**/ContactUsRequest/CreateAsync').as('contactUsSubmit');
        contactUsPage.clickSubmit();
        cy.wait('@contactUsSubmit', { timeout: 20000 });
    });
});
