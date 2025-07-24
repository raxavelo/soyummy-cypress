class WelcomePage {
  #url = "https://so-yummi-qa.netlify.app/";

  visit() {
    cy.visit(this.#url);
  }

  getUrl() {
    return this.#url;
  }

  getTitle() {
    return cy.get(".sc-fmSAUk");
  }

  getDescription() {
    return cy.get(".sc-fGFwAa");
  }

  getRegisterButton() {
    return cy.get(".sc-ieZDjg");
  }

  getSignInButton() {
    return cy.get(".sc-dKfzgJ");
  }
}

export default new WelcomePage();
