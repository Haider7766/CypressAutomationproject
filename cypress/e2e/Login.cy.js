import Login from "../Pages/LoginPage";

describe('OrangeHRM Login Test using POM', () => {
  let loginData;

  beforeEach(() => {
    cy.fixture('loginData').then((data) => {
      loginData = data;
    });
  });

  it('should login successfully using POM', () => {
    const login = new Login();
    cy.visit('/');
    login.setUserName(loginData.username);
    login.setPassword(loginData.password);
    login.clickSubmit();
    login.verifyLogin();
  });
});

describe('OrangeHRM Login Test using Custom Command', () => {
  let loginData;

  beforeEach(() => {
    cy.fixture('loginData').then((data) => {
      loginData = data;
    });
  });

  it('should login successfully using custom command', () => {
    cy.login(loginData.username, loginData.password);
  });
});
