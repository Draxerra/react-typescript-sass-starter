describe("Counter", () => {
  it("should start with a count of 0", () => {
    cy.visit("/");
    cy.contains("Current Count: 0").should("exist");
  });

  it("should increment by 1", () => {
    cy.visit("/");
    cy.contains("Increment").click();
    cy.contains("Current Count: 1").should("exist");
  });

  it("should decrement by 1", () => {
    cy.visit("/");
    cy.contains("Decrement").click();
    cy.contains("Current Count: -1").should("exist");
  });
});
