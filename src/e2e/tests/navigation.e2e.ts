describe("Navigation", () => {
  it("should navigate to contact page", () => {
    cy.visit("/");

    cy.findByText("Contact").click();

    cy.url().should("include", "/contact");
    cy.findByText("Home").should("not.have.attr", "aria-current", "page");
    cy.findByText("Contact").should("have.attr", "aria-current", "page");
  });

  it("should navigate to home page", () => {
    cy.visit("/contact");

    cy.findByText("Home").click();

    cy.url().should("not.include", "/contact");
    cy.findByText("Home").should("have.attr", "aria-current", "page");
    cy.findByText("Contact").should("not.have.attr", "aria-current", "page");
  });
});
