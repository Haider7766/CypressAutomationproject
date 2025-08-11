import { agentlocators } from "../Locators/AgentLocators.js";
class Agent{

signupp = agentlocators.signupp;
txtyes = agentlocators.txtyes;
agenttype = agentlocators.agenttype;
selectlist = agentlocators.selectlist;
agentname = agentlocators.agentname;

clicksignup() {
    cy.get(this.signupp ,{ timeout: 20000 }).click();
  }


  clickyes(){
cy.get(this.txtyes,{ timeout: 10000 }).click();
  }

 selectAgentType() {
  cy.get(this.agenttype, { timeout: 10000 }).first().click();
  cy.get(this.selectlist,{timeout: 10000}).contains('Individual').click();
}

  enterAgentName(name) {
    cy.get(this.agentname).clear().type(name);
  }
}
export default Agent;