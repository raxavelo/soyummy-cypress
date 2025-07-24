class SignInPage {
  #url = "https://so-yummi-qa.netlify.app/login";

  visit() {
    cy.visit(this.#url);
  }

  getUrl() {
    return this.#url;
  }
}

export default new SignInPage();
