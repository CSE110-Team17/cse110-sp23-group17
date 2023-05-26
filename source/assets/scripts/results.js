// import tarotConfig from '/source/assets/tarot.json' assert { type: 'json' };
import tarotConfig from '../tarot.json' assert { type: 'json' };

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
const storedCards = localStorage.getItem('chosenCards');
if (storedCards !== null) {
  chosenCards = Object.values(JSON.parse(storedCards)).map(String);
}

// Keep track of current screen width
let screenWidth = window.innerWidth;

// Update cards for desktop
const cardContainers = document.getElementsByClassName('card');
for (let i = 0; i < chosenCards.length; i++) {
  const card = chosenCards[i];
  const cardContainer = cardContainers[i];
  const cardImg = cardContainer.querySelector('img');
  const cardName = cardContainer.querySelector('h1');
  const cardDesc = cardContainer.querySelector('p');

  cardImg.src = tarotMap[card].image;
  cardName.textContent = tarotMap[card].name;
  cardDesc.textContent = tarotMap[card].description;
}

// Update card for mobile
let idx = 0;
const mobileCard = cardContainers[3];
const nextButton = document.getElementById('button-1');
const prevButton = document.getElementById('button-2');
if (prevButton !== null) {
  prevButton.style.display = 'none';
}

// Check that mobileCard is defined before updateMobileCard()
if (mobileCard !== undefined) {
  updateMobileCard();

  // Go back to the previous card
  prevButton.addEventListener('click', () => {
    idx--;
    updateMobileCard();
    updateButtonVisibility(idx);
  });

  // Go to the next card
  nextButton.addEventListener('click', () => {
    idx++;
    updateMobileCard();
    updateButtonVisibility(idx);
  });
}

// Display the current card
export function updateMobileCard() {
  const card = chosenCards[idx];
  const cardImg = mobileCard.querySelector('img');
  const cardName = mobileCard.querySelector('h1');
  const cardDesc = mobileCard.querySelector('p');

  cardImg.src = tarotMap[card].image;
  cardName.textContent = tarotMap[card].name;
  cardDesc.textContent = tarotMap[card].description;
}

// Update button visibility - should not show the previous button when on the first card and should not show the next button on the last card
export function updateButtonVisibility(idx) {
  const prevButton = document.getElementById('button-2');
  const nextButton = document.getElementById('button-1');
  const screenWidth = window.innerWidth;
  const chosenCards = ['card1', 'card2', 'card3'];

  if (screenWidth > 600) {
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
  } else {
    prevButton.style.display = idx >= 1 ? 'block' : 'none';
    nextButton.style.display = idx < chosenCards.length - 1 ? 'block' : 'none';
  }
}

// Update button visibility when switching screen sizes
window.addEventListener('resize', handleWindowSizeChange);

function handleWindowSizeChange() {
  screenWidth = window.innerWidth;
  updateButtonVisibility(idx);
}
