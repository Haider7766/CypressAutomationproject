import Agent from '../Pages/Agentpage';
const agent  = new Agent();
describe('Agent test', () => {
    let Data;
  before(() => {
    cy.fixture('Agentdata').then((data) => {
      Data = data;
    });
  });

  beforeEach(() => {
    cy.visit('/account/register'); 
  });

  it('agent registration form', function () {
    agent.clicksignup();
    agent.clickyes();
    agent.selectAgentType()
    agent.enterAgentName(Data.agentname);

  })
});