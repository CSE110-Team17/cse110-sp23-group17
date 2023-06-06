import tarotConfig from "../tarot.js";
/**
 * Create a hashmap for all tarot cards that can be indexed by card name
 * @return {Map} a hashmap of all the cards and their information parsed
 */
const tarotMap = tarotConfig.tarot.reduce((map, card) => {
  map[card.name] = {
    suite: card.suite,
    image: card.image,
    light: card.meanings.light,
    shadow: card.meanings.shadow,
    fortune: card.fortune_telling,
  };
  return map;
}, {});

// Pull selected cards from gameplay
let chosenCards = [];

// Store randomly select fortune tellings to be pulled from for mobile display
let fortuneTellings = [];

const storedCards = localStorage.getItem("chosenCards");
if (storedCards !== null) {
  chosenCards = Object.values(JSON.parse(storedCards)).map(String);
}

// Keep track of current screen width
export let screenWidth = window.innerWidth;

// Update cards for desktop
const cardContainers = document.getElementsByClassName("card");
for (let i = 0; i < chosenCards.length; i++) {
  const card = chosenCards[i];
  const cardContainer = cardContainers[i + 1];
  const cardImg = cardContainer.querySelector("img");
  const cardDesc = cardContainer.querySelector("p");

  cardImg.src = tarotMap[card].image;

  Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
  };
  const telling = tarotMap[card].fortune.sample();
  cardDesc.textContent = telling;
  fortuneTellings.push(telling);
}

// Update card for mobile
let idx = 0;
const mobileCard = cardContainers[5];
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
if (prevButton !== null) {
  prevButton.style.display = "none";
}

// Check that mobileCard is defined before updateMobileCard()
if (mobileCard !== undefined) {
  updateMobileCard();

  // Go back to the previous card
  prevButton.addEventListener("click", () => {
    idx--;
    updateMobileCard();
    updateButtonVisibility(chosenCards, idx);
  });

  // Go to the next card
  nextButton.addEventListener("click", () => {
    idx++;
    updateMobileCard();
    updateButtonVisibility(chosenCards, idx);
  });
}

/**
 * Display the current card on the mobile side
 */
export function updateMobileCard() {
  const card = chosenCards[idx];
  const cardImg = mobileCard.querySelector("img");
  const cardDesc = mobileCard.querySelector("p");
  cardImg.src = tarotMap[card].image;
  cardDesc.textContent = fortuneTellings[idx];
}

/**
 * Update button visibility - should not show the previous button when on the
 * first card and should not show the next button on the last card
 * @param {*} idx index of current card when in mobile mode
 */
export function updateButtonVisibility(chosenCards, idx) {
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  const screenWidth = window.innerWidth;

  if (screenWidth > 600) {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  } else {
    prevButton.style.display = idx >= 1 ? "flex" : "none";
    nextButton.style.display = idx < chosenCards.length - 1 ? "flex" : "none";
  }
}

// Update button visibility when switching screen sizes
window.addEventListener("resize", handleWindowSizeChange);

/**
 * Handles window size change
 */
export function handleWindowSizeChange() {
  screenWidth = window.innerWidth;
  updateButtonVisibility(chosenCards, idx);
}
