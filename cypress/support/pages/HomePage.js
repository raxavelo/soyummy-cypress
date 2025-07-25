class HomePage {
  #url = "https://so-yummi-qa.netlify.app/home";

  visit() {
    cy.visit(this.#url);
  }

  getUrl() {
    return this.#url;
  }
}

export default new HomePage();
