import Login from '../pages/LoginPage';

const login = new Login();

describe('Login Test - Page Object Model', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.fixture('LoginData').as('loginData');
  });

  it('should login successfully', function () {
    login.setUserName(this.loginData.username);
    login.setPassword(this.loginData.password);
    login.clickSubmit();
    login.verifyLogin();
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
});
