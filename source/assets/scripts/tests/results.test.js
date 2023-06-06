const results = require("../results");

/**
 * Test if next and previous buttons' visibility are correctly updated
 */
describe("updateButtonVisibility", function () {
  let prevButton;
  let nextButton;
  let chosenCards;

  beforeEach(function () {
    chosenCards = ["card1", "card2", "card3", "card4"];

    // Create a container element to hold the buttons
    const container = document.createElement("div");
    container.innerHTML = `
      <button id="prev-button" style="display: flex;">Previous</button>
      <button id="next-button" style="display: flex;">Next</button>
    `;
    document.body.appendChild(container);

    // Get references to the buttons
    prevButton = document.getElementById("prev-button");
    nextButton = document.getElementById("next-button");
  });

  afterEach(function () {
    document.body.innerHTML = "";
  });

  it("should hide the buttons when screen width is above 600", function () {
    global.innerWidth = 800;
    results.updateButtonVisibility(chosenCards, 0);

    // Expect the buttons to be hidden because the screen size is above 600
    expect(prevButton.style.display).toBe("none");
    expect(nextButton.style.display).toBe("none");
  });

  it("should show the next button and hide the previous button when screen width is below 600 when idx is 0", function () {
    global.innerWidth = 500;
    results.updateButtonVisibility(chosenCards, 0);

    // Expect that only the next button to be visible because index is at 0
    expect(prevButton.style.display).toBe("none");
    expect(nextButton.style.display).toBe("flex");
  });

  it("should hide the next button and show the previous button when screen width is below 600 and when idx is 3", function () {
    global.innerWidth = 500;
    results.updateButtonVisibility(chosenCards, 3);

    // Expect that only the previous button to be visible because idx is 3
    expect(prevButton.style.display).toBe("flex");
    expect(nextButton.style.display).toBe("none");
  });

  it("should show the next and previous buttons when screen width is below 600 and when idx is 2", function () {
    global.innerWidth = 500;
    results.updateButtonVisibility(chosenCards, 2);

    // Expect that only the previous button to be visible because idx is 2
    expect(prevButton.style.display).toBe("flex");
    expect(nextButton.style.display).toBe("flex");
  });
});

/**
 * Test if screenWith changes are correctly updated
 */
describe("handleWindowSizeChange", function () {
  let originalWindow;
  let prevButton;
  let nextButton;

  beforeAll(function () {
    // Store the original window object
    originalWindow = global.window;

    // Create a mock window object
    global.window = {
      innerWidth: 1024,
    };

    // Attach the addEventListener method to the mock window object
    global.window.addEventListener = jest.fn();

    // Create a container element to hold the buttons
    const container = document.createElement("div");
    container.innerHTML = `
       <button id="prev-button" style="display: flex;">Previous</button>
       <button id="next-button" style="display: flex;">Next</button>
     `;
    document.body.appendChild(container);

    // Get references to the buttons
    prevButton = document.getElementById("prev-button");
    nextButton = document.getElementById("next-button");
  });

  afterAll(function () {
    global.window = originalWindow;
  });

  it("should update the screenWidth variable when window size changes to 800", function () {
    const newScreenWidth = 800;
    global.window.innerWidth = newScreenWidth;
    results.handleWindowSizeChange();

    // Assert that the screenWidth variable is updated correctly
    expect(results.screenWidth).toBe(newScreenWidth);
  });

  it("should not update the screenWidth variable when window size doesn't change", function () {
    const initialScreenWidth = results.screenWidth;
    results.handleWindowSizeChange();

    // Assert that the screenWidth variable remains the same
    expect(results.screenWidth).toBe(initialScreenWidth);
  });
});

// describe("updateMobileCard", function () {
//   beforeEach(function () {
//     // Create a container element to hold the buttons
//     const container = document.createElement("div");
//     container.innerHTML = `
//     <img id="image-1" src="assets/images/blank-card.png" alt="Blank Card" height="269" width="220" />
//     <p id="description-1">Card Description</p>
//     `;
//     document.body.appendChild(container);

//     console.log(container);
//     results.mobileCard = container;

//     results.idx = 0;
//     results.chosenCards = ["card1", "card2", "card3"];
//     results.tarotMap = {
//       card1: {
//         image: "card1.jpg",
//       },
//       card2: {
//         image: "card2.jpg",
//       },
//       card3: {
//         image: "card3.jpg",
//       },
//     };

//     results.fortuneTellings = ["Fortune 1", "Fortune 2", "Fortune 3"];
//   });

//   afterEach(function () {
//     document.body.innerHTML = "";
//   });

//   it("update mobile card correctly when idx = 1", function () {
//     results.updateMobileCard();
//     // Expect the buttons to be hidden because the screen size is above 600
//     expect(results.card).toBe("card1");
//     expect(results.cardImg.src).toBe("card1.jpg");
//     expect(results.cardDesc.src).toBe("Fortune 1");
//   });
// });
