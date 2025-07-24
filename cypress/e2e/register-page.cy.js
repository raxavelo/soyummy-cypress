import RegisterPage from "../support/pages/RegisterPage";

describe("Register Page", () => {
  beforeEach(() => {
    RegisterPage.visit();
  });

  it("should visit the register page", () => {
    cy.url().should("equal", RegisterPage.getUrl());
  });
});
