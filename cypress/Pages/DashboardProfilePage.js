import DashboardProfile from "../Locators/DashboardProfileLocators.js";

class DashboardProfilePage {
    profileMenu = DashboardProfile.ProfileMenu;
    clickProfileMenu() {
        cy.get(this.profileMenu).click();
    }
}
export default DashboardProfilePage;
