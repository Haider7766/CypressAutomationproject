    import { agentlocators } from "../Locators/AgentLocators.js";
    class Agent{

    signupp = agentlocators.signupp;
    txtyes = agentlocators.txtyes;
    agenttype = agentlocators.agenttype;
    selectlist = agentlocators.selectlist;
    agentname = agentlocators.agentname;

    clicksignup() {
        cy.get(this.signupp ,{ timeout: 60000  }).click();
      }


     clickyes() {
    cy.get(this.txtyes, { timeout: 60000 }).should('be.visible').click();
}

    selectAgentType() {
      cy.get(this.agenttype, { timeout: 60000  }).first().click();
      cy.get(this.selectlist,{timeout: 60000 }).contains('Individual').click();
    }

      enterAgentName(name) {
        cy.get(this.agentname,{ timeout: 60000  }).clear().type(name);
      }
    }
    export default Agent;