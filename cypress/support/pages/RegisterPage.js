class RegisterPage {
  #url = "https://so-yummi-qa.netlify.app/register";

  visit() {
    cy.visit(this.#url);
  }

  getUrl() {
    return this.#url;
  }
}

export default new RegisterPage();
