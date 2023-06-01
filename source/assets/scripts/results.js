import tarotConfig from "../tarot.json" assert { type: "json" };

// Create a hashmap for all tarot cards that can be indexed by card name
const tarotMap = tarotConfig.tarot.reduce((map, card) => {
  map[card.name] = {
    suite: card.suite,
    image: card.image,
    description: card.description,
    interpretation: card.interpretation,
  };
  return map;
}, {});

// Pull selected cards from gameplay
let chosenCards = [];
const storedCards = localStorage.getItem("chosenCards");
if (storedCards !== null) {
  chosenCards = Object.values(JSON.parse(storedCards)).map(String);
}

// Keep track of current screen width
let screenWidth = window.innerWidth;

// Update cards for desktop
const cardContainers = document.getElementsByClassName("card");
for (let i = 0; i < chosenCards.length; i++) {
  const card = chosenCards[i];
  const cardContainer = cardContainers[i];
  cardContainer.style.display = "flex";
  const cardImg = cardContainer.querySelector("img");
  const cardDesc = cardContainer.querySelector("p");

  cardImg.src = tarotMap[card].image;
  cardDesc.textContent = tarotMap[card].description;
}

// Update card for mobile
let idx = 0;
const mobileCard = cardContainers[4];
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
if (prevButton !== null) {
  prevButton.style.display = "none";
}

// Check that mobileCard is defined before updateMobileCard()
if (mobileCard !== undefined) {
  updateMobileCard();

  // Go back to the previous card
  prevButton.addEventListener("click", function () {
    idx--;
    updateMobileCard();
    updateButtonVisibility(idx);
  });

  // Go to the next card
  nextButton.addEventListener("click", function () {
    idx++;
    updateMobileCard();
    updateButtonVisibility(idx);
  });
}

/**
 * Display the current card
 */
export function updateMobileCard() {
  const card = chosenCards[idx];
  const cardImg = mobileCard.querySelector("img");
  const cardDesc = mobileCard.querySelector("p");

  cardImg.src = tarotMap[card].image;
  cardDesc.textContent = tarotMap[card].description;
}

/**
 * Update button visibility - should not show the previous button when on the first card and should not show the next button on the last card
 * @param {*} idx index of current card when in mobile mode
 */
export function updateButtonVisibility(idx) {
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  if (screenWidth > 600) {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  } else {
    prevButton.style.display = idx >= 1 ? "block" : "none";
    nextButton.style.display = idx < chosenCards.length - 1 ? "block" : "none";
  }
}

// Update button visibility when switching screen sizes
window.addEventListener("resize", handleWindowSizeChange);

/**
 * Function for handling window size change
 */
function handleWindowSizeChange() {
  screenWidth = window.innerWidth;
  if (screenWidth > 600) {
    for (let i = 0; i < chosenCards.length; i++) {
      const cardContainer = cardContainers[i];
      cardContainer.style.display = "flex";
    }
  } else {
    for (let i = 0; i < chosenCards.length; i++) {
      const cardContainer = cardContainers[i];
      cardContainer.style.display = "none";
    }
  }
  updateButtonVisibility(idx);
}
