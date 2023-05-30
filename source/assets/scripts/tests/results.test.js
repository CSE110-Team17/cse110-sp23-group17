const results = require("../results");

/**
 * Test if next and prev buttons show up in correct version
 */
describe("updateButtonVisibility", function () {
  let prevButton;
  let nextButton;

  beforeEach(function () {
    // Create a container element to hold the buttons
    const container = document.createElement("div");
    container.innerHTML = `
      <button id="button-2" style="display: block;">Previous</button>
      <button id="button-1" style="display: block;">Next</button>
    `;
    document.body.appendChild(container);

    // Get references to the buttons
    prevButton = document.getElementById("button-2");
    nextButton = document.getElementById("button-1");
  });

  afterEach(function () {
    // Clean up the DOM after each test
    document.body.innerHTML = "";
  });

  it("should hide the buttons when screen width is above 600", function () {
    // Set the screen width above 600
    global.innerWidth = 800;

    // Call the updateButtonVisibility function
    results.updateButtonVisibility(0);

    // Expect the buttons to be hidden
    expect(prevButton.style.display).toBe("none");
    expect(nextButton.style.display).toBe("none");
  });

  it("should show the buttons when screen width is below 600", function () {
    // Set the screen width below 600
    global.innerWidth = 500;

    // Call the updateButtonVisibility function
    results.updateButtonVisibility(0);

    // Expect that only the next button to be visible because index is at 0
    expect(prevButton.style.display).toBe("none");
    expect(nextButton.style.display).toBe("block");
  });
});
