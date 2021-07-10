describe("Counter", () => {
  it("should start with a count of 0", () => {
    cy.visit("/");
    cy.findByText("Current Count: 0").should("exist");
  });

  it("should increment by 1", () => {
    cy.visit("/");
    cy.findByText("Increment").click();
    cy.findByText("Current Count: 1").should("exist");
  });

  it("should decrement by 1", () => {
    cy.visit("/");
    cy.findByText("Decrement").click();
    cy.findByText("Current Count: -1").should("exist");
  });
});
