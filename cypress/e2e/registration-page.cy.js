import RegisterPage from "../support/pages/RegistrationPage";
import HomePage from "../support/pages/HomePage";
import { faker } from "@faker-js/faker";

describe("Register Page", () => {
  beforeEach(() => {
    RegisterPage.visit();
  });

  it("should visit the register page", () => {
    cy.url().should("equal", RegisterPage.getUrl());
  });

  it("should display the registration form", () => {
    RegisterPage.getRegistrationForm().should("be.visible");
  });

  it("should display a title in the registration form", () => {
    RegisterPage.getRegistrationFormTitle()
      .should("be.visible")
      .should("contain.text", "Registration");
  });

  it("should have a username input", () => {
    RegisterPage.getUsernameInput()
      .should("be.visible")
      .should("have.attr", "placeholder", "Name");
  });

  it("should have an email input", () => {
    RegisterPage.getEmailInput()
      .should("be.visible")
      .should("have.attr", "placeholder", "Email");
  });

  it("should have a password input", () => {
    RegisterPage.getPasswordInput()
      .should("be.visible")
      .should("have.attr", "placeholder", "Password");
  });

  it("should have a sign up button", () => {
    RegisterPage.getSignUpButton()
      .should("be.visible")
      .should("contain.text", "Sign Up");
  });

  it("should have a link to sign in", () => {
    RegisterPage.getSignInLink()
      .should("be.visible")
      .should("contain.text", "Sign In");
  });

  it("should register a new user when correct details are provided", () => {
    const username = faker.string.alphanumeric({ length: { min: 1, max: 16 } });
    const email = faker.internet.email();
    const password = faker.internet.password({
      length: 10,
      pattern: /[A-Za-z0-9]/,
    });

    RegisterPage.getUsernameInput().type(username);
    RegisterPage.getEmailInput().type(email);
    RegisterPage.getPasswordInput().type(password);
    RegisterPage.getSignUpButton().click();

    // Successful registration redirects to a home page or dashboard
    cy.url().should("equal", HomePage.getUrl());
  });

  it("should require to fill all fields", () => {
    RegisterPage.getUsernameInput().should("have.attr", "required");
    RegisterPage.getUsernameInput()
      .invoke("prop", "validationMessage")
      .should("not.equal", "");

    RegisterPage.getEmailInput().should("have.attr", "required");
    RegisterPage.getEmailInput()
      .invoke("prop", "validationMessage")
      .should("not.equal", "");

    RegisterPage.getPasswordInput().should("have.attr", "required");
    RegisterPage.getPasswordInput()
      .invoke("prop", "validationMessage")
      .should("not.equal", "");
  });

  it("should reject names longer than 16 characters", () => {
    const username = faker.string.alphanumeric({
      length: { min: 17, max: 20 },
    });
    RegisterPage.getUsernameInput().type(username);
    RegisterPage.getUsernameInput()
      .invoke("prop", "validationMessage")
      .should("not.equal", "");
  });

  it.only("should reject names with non-alphanumerical characters", () => {
    const username = faker.string.symbol(8);
    RegisterPage.getUsernameInput().type(username);
    RegisterPage.getUsernameInput()
      .invoke("prop", "validationMessage")
      .should("not.equal", "");
  });
});
