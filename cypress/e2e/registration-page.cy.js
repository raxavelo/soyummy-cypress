import ReggistrationPage from "../support/pages/RegistrationPage";
import RegistrationPage from "../support/pages/RegistrationPage";
import HomePage from "../support/pages/HomePage";
import SignInPage from "../support/pages/SignInPage";
import { faker } from "@faker-js/faker";

describe("Register Page", () => {
  beforeEach(() => {
    RegistrationPage.visit();
  });

  it("should visit the register page", () => {
    cy.url().should("equal", RegistrationPage.getUrl());
  });

  it("should display the registration form", () => {
    RegistrationPage.getRegistrationForm().should("be.visible");
  });

  it("should display a title in the registration form", () => {
    RegistrationPage.getRegistrationFormTitle()
      .should("be.visible")
      .should("contain.text", "Registration");
  });

  it("should have a username input", () => {
    RegistrationPage.getUsernameInput()
      .should("be.visible")
      .should("have.attr", "placeholder", "Name");
  });

  it("should have an email input", () => {
    RegistrationPage.getEmailInput()
      .should("be.visible")
      .should("have.attr", "placeholder", "Email");
  });

  it("should have a password input", () => {
    RegistrationPage.getPasswordInput()
      .should("be.visible")
      .should("have.attr", "placeholder", "Password");
  });

  it("should have a sign up button", () => {
    RegistrationPage.getSignUpButton()
      .should("be.visible")
      .should("contain.text", "Sign Up");
  });

  it("should have a link to sign in", () => {
    RegistrationPage.getSignInLink()
      .should("be.visible")
      .should("contain.text", "Sign In");
  });

  it("should register a new user when correct details are provided", () => {
    const username = faker.string.alphanumeric({ length: { min: 8, max: 16 } });
    const email = faker.internet.email();
    const password = faker.string.alpha(10) + faker.string.numeric(4);

    RegistrationPage.getUsernameInput().type(username);
    RegistrationPage.getEmailInput().type(email);
    RegistrationPage.getPasswordInput().type(password);
    ReggistrationPage.getRegistrationForm().within(() => {
      cy.get("input:invalid").should("have.length", 0);
    });
    RegistrationPage.getSignUpButton().click();

    // Successful registration redirects to a home page or dashboard
    cy.url().should("equal", HomePage.getUrl());
  });

  it("should require to fill all fields", () => {
    RegistrationPage.getUsernameInput().should("have.attr", "required");
    RegistrationPage.getUsernameInput()
      .invoke("prop", "validationMessage")
      .should("not.equal", "");

    RegistrationPage.getEmailInput().should("have.attr", "required");
    RegistrationPage.getEmailInput()
      .invoke("prop", "validationMessage")
      .should("not.equal", "");

    RegistrationPage.getPasswordInput().should("have.attr", "required");
    RegistrationPage.getPasswordInput()
      .invoke("prop", "validationMessage")
      .should("not.equal", "");
  });

  it("should reject names longer than 16 characters", () => {
    const username = faker.string.alphanumeric({
      length: { min: 17, max: 20 },
    });
    RegistrationPage.getUsernameInput().type(username);
    RegistrationPage.getUsernameInput()
      .invoke("prop", "validationMessage")
      .should("not.equal", "");
  });

  it("should reject names with non-alphanumerical characters", () => {
    const username = faker.string.symbol(8);
    RegistrationPage.getUsernameInput().type(username);
    RegistrationPage.getUsernameInput()
      .invoke("prop", "validationMessage")
      .should("not.equal", "");
  });

  it("should reject invalid email formats", () => {
    const invalidEmail = "invalid-email-format";
    RegistrationPage.getEmailInput().type(invalidEmail);
    RegistrationPage.getEmailInput()
      .invoke("prop", "validationMessage")
      .should("not.equal", "");
  });

  it("should reject passwords shorter than 6 characters", () => {
    const shortPassword = faker.string.alpha(5);
    RegistrationPage.getPasswordInput().type(shortPassword);
    RegistrationPage.getPasswordInput()
      .invoke("prop", "validationMessage")
      .should("not.equal", "");
  });

  it("should reject passwords longer than 16 characters", () => {
    const longPassword = faker.string.alpha(15) + faker.string.numeric(2);
    RegistrationPage.getPasswordInput().type(longPassword);
    RegistrationPage.getPasswordInput()
      .invoke("prop", "validationMessage")
      .should("not.equal", "");
  });

  it("should reject passwords with alphabetical characters only", () => {
    const alphaPassword = faker.string.alpha(10);
    RegistrationPage.getPasswordInput().type(alphaPassword);
    RegistrationPage.getPasswordInput()
      .invoke("prop", "validationMessage")
      .should("not.equal", "");
  });

  it("should reject passwords with numerical characters only", () => {
    const numericPassword = faker.string.numeric(10);
    RegistrationPage.getPasswordInput().type(numericPassword);
    RegistrationPage.getPasswordInput()
      .invoke("prop", "validationMessage")
      .should("not.equal", "");
  });

  it("should reject passwords without Uppercase letters", () => {
    const passwordWithoutUppercase =
      faker.string.alpha(10).toLowerCase() + faker.string.numeric(4);
    RegistrationPage.getPasswordInput().type(passwordWithoutUppercase);
    RegistrationPage.getPasswordInput()
      .invoke("prop", "validationMessage")
      .should("not.equal", "");
  });

  it("should reject passwords without Lowercase letters", () => {
    const passwordWithoutLowercase =
      faker.string.alpha(10).toUpperCase() + faker.string.numeric(4);
    RegistrationPage.getPasswordInput().type(passwordWithoutLowercase);
    RegistrationPage.getPasswordInput()
      .invoke("prop", "validationMessage")
      .should("not.equal", "");
  });

  it("should navigate to the sign in page when clicking the sign in link", () => {
    RegistrationPage.getSignInLink().click();
    cy.url().should("equal", SignInPage.getUrl());
  });
});
