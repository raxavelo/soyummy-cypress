import WelcomePage from "../support/pages/WelcomePage";
import RegisterPage from "../support/pages/RegisterPage";
import SignInPage from "../support/pages/SignInPage";

describe("Welcome Page", () => {
  beforeEach(() => {
    WelcomePage.visit();
  });

  it("should visit the welcome page", () => {
    cy.url().should("equal", WelcomePage.getUrl());
  });

  it("should display the proper title", () => {
    WelcomePage.getTitle()
      .should("be.visible")
      .should("contain.text", "Welcome to the app");
  });

  it("should display the description", () => {
    WelcomePage.getDescription().should("be.visible");
  });

  it("should have a register button", () => {
    WelcomePage.getRegisterButton()
      .should("be.visible")
      .should("contain.text", "Registration");
  });

  it("should have a sign in button", () => {
    WelcomePage.getSignInButton()
      .should("be.visible")
      .should("contain.text", "Sign in");
  });

  it("should navigate to the register page when clicking the register button", () => {
    WelcomePage.getRegisterButton().click();
    cy.url().should("equal", RegisterPage.getUrl());
  });

  it("should navigate to the sign in page when clicking the sign in button", () => {
    WelcomePage.getSignInButton().click();
    cy.url().should("equal", SignInPage.getUrl());
  });
});
