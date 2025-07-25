class RegistrationPage {
  #url = "https://so-yummi-qa.netlify.app/register";

  visit() {
    cy.visit(this.#url);
  }

  getUrl() {
    return this.#url;
  }

  getRegistrationForm() {
    return cy.get(".sc-kgKVFY");
  }

  getRegistrationFormTitle() {
    return cy.get(".sc-fmSAUk");
  }

  getUsernameInput() {
    return cy.get("#usernameInput");
  }

  getEmailInput() {
    return cy.get("#emailInput");
  }

  getPasswordInput() {
    return cy.get("#passwordInput");
  }

  getSignUpButton() {
    return cy.get(".sc-hIqOWS");
  }

  getSignInLink() {
    return cy.get(".sc-dnwKUv");
  }
}

export default new RegistrationPage();
