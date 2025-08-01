import Login from "../Pages/LoginPges";

describe('OrangeHRM Login Test', () => {
    let loginData;
  beforeEach(function () {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.fixture('loginData').then((data) => {loginData= data})
     
  })

  it('should login successfully using fixture and POM', function () {
   const login = new Login();
    login.setUserName(loginData.username);
    login.setPassword(loginData.password);
    login.clickSubmit();
   login.verifyLogin();
  })
})