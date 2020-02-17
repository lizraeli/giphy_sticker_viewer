/// <reference types="cypress" />

context("Local Storage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Page load", () => {
    cy.contains("settings");
    cy.contains("Search for stickers");
    cy.contains("type to search for stickers");
    cy.contains("recent");
  });

  it("Settings", () => {
    cy.findByText("settings").click();
    cy.contains("Theme");
    cy.contains("close");
  });
});
