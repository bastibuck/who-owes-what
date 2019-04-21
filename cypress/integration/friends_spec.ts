describe("Friends tab", function() {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should add multiple friends correctly", function() {
    // friend tab active
    cy.contains(/add friends/i)
      .closest("a")
      .should("not.have.attr", "disabled");
    cy.contains(/add expenses/i)
      .closest("a")
      .should("have.attr", "disabled");
    cy.contains(/see results/i)
      .closest("a")
      .should("have.attr", "disabled");

    // add button disabled
    cy.get("button")
      .contains(/add friend/i)
      .should("have.attr", "disabled");

    // enter first friend name
    cy.getByPlaceholderText(/input a friend's name/i)
      .focus()
      .type("Tom");

    // button becomes enabled
    cy.get("button")
      .contains(/add friend/i)
      .should("not.have.attr", "disabled");

    // click add friend button
    cy.get("button")
      .contains(/add friend/i)
      .click();

    // added friend to friend list
    cy.contains(/splitting expenses between/i)
      .siblings()
      .last()
      .contains("Tom");

    // expenses tab enabled
    cy.contains(/add friends/i)
      .closest("a")
      .should("not.have.attr", "disabled");
    cy.contains(/add expenses/i)
      .closest("a")
      .should("not.have.attr", "disabled");
    cy.contains(/see results/i)
      .closest("a")
      .should("have.attr", "disabled");

    // add button disabled
    cy.get("button")
      .contains(/add friend/i)
      .should("have.attr", "disabled");

    // add another friend by hitting enter
    cy.getByPlaceholderText(/input a friend's name/i)
      .focus()
      .type("Mary")
      .type("{enter}");

    // check focus is still on the input
    cy.focused().getByPlaceholderText(/input a friend's name/i);

    // added friend to friend list
    cy.contains(/splitting expenses between/i)
      .siblings()
      .last()
      .contains("Mary");

    cy.contains(/splitting expenses between/i)
      .siblings()
      .last()
      .children()
      .should("have.length", 2);

    // add more friends
    cy.getByPlaceholderText(/input a friend's name/i)
      .focus()
      .type("Peter")
      .type("{enter}")
      .wait(10);

    cy.getByPlaceholderText(/input a friend's name/i)
      .focus()
      .type("Bob")
      .type("{enter}")
      .wait(10);

    cy.getByPlaceholderText(/input a friend's name/i)
      .focus()
      .type("Lisa")
      .type("{enter}")
      .wait(10);

    cy.contains(/splitting expenses between/i)
      .siblings()
      .last()
      .children()
      .should("have.length", 5);
  });

  it("should delete and re-add friends correctly", () => {
    // add Tom
    cy.getByPlaceholderText(/input a friend's name/i)
      .focus()
      .type("Tom");

    cy.get("button")
      .contains(/add friend/i)
      .click();

    // add Mary
    cy.getByPlaceholderText(/input a friend's name/i)
      .focus()
      .type("Mary")
      .type("{enter}");

    // check both exist
    cy.contains(/splitting expenses between/i)
      .siblings()
      .last()
      .children()
      .should("have.length", 2);

    cy.contains(/splitting expenses between/i)
      .siblings()
      .last()
      .contains("Tom");

    cy.contains(/splitting expenses between/i)
      .siblings()
      .last()
      .contains("Mary");

    // delete Tom
    cy.getByTitle(/remove 'tom'/i).click();

    // check it's gone
    cy.contains(/splitting expenses between/i)
      .siblings()
      .last()
      .contains("Tom")
      .should("not.exist");

    // re-add Tom and many more
    cy.getByPlaceholderText(/input a friend's name/i)
      .focus()
      .type("Tom")
      .type("{enter}")
      .type("Peter")
      .type("{enter}")
      .type("Lisa")
      .type("{enter}")
      .type("Alex")
      .type("{enter}")
      .type("Cathy")
      .type("{enter}")
      .type("Theresa")
      .type("{enter}");

    // check all are there
    cy.contains(/splitting expenses between/i)
      .siblings()
      .last()
      .contains("Tom");
    cy.contains(/splitting expenses between/i)
      .siblings()
      .last()
      .children()
      .should("have.length", 7);

    // delete both friends
    cy.getAllByTitle(/remove '/i).click({ multiple: true });

    // check app is in initial state
    cy.contains(/splitting expenses between/i).should("not.exist");
    cy.contains(/add expenses/i)
      .closest("a")
      .should("have.attr", "disabled");
    cy.contains(/see results/i)
      .closest("a")
      .should("have.attr", "disabled");
    cy.get("button")
      .contains(/add friend/i)
      .should("have.attr", "disabled");
  });
});
