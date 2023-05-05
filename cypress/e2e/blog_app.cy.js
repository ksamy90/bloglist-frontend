describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "samson omondi",
      username: "samson",
      password: "1040eazy",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login").click();
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("samson");
      cy.get("#password").type("1040eazy");
      cy.get("#login-button").click();

      cy.contains("samson omondi logged in");
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("samson");
      cy.get("#password").type("design");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "samson omondi logged in");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("#username").type("samson");
      cy.get("#password").type("1040eazy");
      cy.get("#login-button").click();
    });

    it("a blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#input-title").type("awesome italy");
      cy.get("#input-url").type("http://milan.io");
      cy.contains("save").click();

      cy.contains("awesome italy");
    });

    it("user can like a blog", function () {
      cy.contains("new blog").click();
      cy.get("#input-title").type("awesome egypt");
      cy.get("#input-url").type("http://egypt.io");
      cy.contains("save").click();
      cy.get(".togglebtn").click();
      cy.contains("like").click();
    });

    it("orders blogs with most likes", function () {
      cy.contains("new blog").click();
      cy.get("#input-title").type("awesome algeria");
      cy.get("#input-url").type("http://algiers.io");
      cy.contains("save").click();
      cy.get(".togglebtn").click();
      cy.contains("like").click();
      cy.get(".blog").eq(0).should("contain", 1);
    });

    // it("user can delete a blog", function () {
    //   // cy.contains("new blog").click();
    //   // cy.get("#input-title").type("awesome tunis");
    //   // cy.get("#input-url").type("http://tunis.io");
    //   // cy.contains("save").click();
    //   cy.get(".togglebtn").click();
    //   cy.contains("remove").click();
    // });
  });
});
