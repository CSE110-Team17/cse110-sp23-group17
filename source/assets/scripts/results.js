import tarotConfig from '/source/assets/tarot.json' assert { type: 'json' };

//create a hashmap for all tarot cards and that can be indexed by card name
const tarotMap = tarotConfig.tarot.reduce((map, card) => {
  map[card.name] = {
    suite: card.suite,
    image: card.image,
    description: card.description,
    interpretation: card.interpretation,
  };
  return map;
}, {});

//pull selected cards from gameplay
let chosenCards = Object.values(
  JSON.parse(localStorage.getItem('chosenCards'))
).map(String);

//keep track of current screen width
let screenWidth = window.innerWidth;

//update cards for desktop
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

//update card for mobile
let idx = 0;
const mobileCard = cardContainers[3];
const nextButton = document.getElementById('button-1');
const prevButton = document.getElementById('button-2');
prevButton.style.display = 'none';

updateMobileCard();

//go back to previous card
prevButton.addEventListener('click', () => {
  idx--;
  updateMobileCard();
  updateButtonVisibility();
});

//go to next card
nextButton.addEventListener('click', () => {
  idx++;
  updateMobileCard();
  updateButtonVisibility();
});

//display the current card
function updateMobileCard() {
  const card = chosenCards[idx];
  const cardImg = mobileCard.querySelector('img');
  const cardName = mobileCard.querySelector('h1');
  const cardDesc = mobileCard.querySelector('p');

  cardImg.src = tarotMap[card].image;
  cardName.textContent = tarotMap[card].name;
  cardDesc.textContent = tarotMap[card].description;
}

//update button visiblity -- should not show previous button when on 1st card and not show next button on last card
function updateButtonVisibility() {
  if (screenWidth > 600) {
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
  } else {
    prevButton.style.display = idx === 0 ? 'none' : 'block';
    nextButton.style.display =
      idx === chosenCards.length - 1 ? 'none' : 'block';
  }
}

//update button visibility when switching screen sizes
window.addEventListener('resize', handleWindowSizeChange);

function handleWindowSizeChange() {
  screenWidth = window.innerWidth;
  updateButtonVisibility();
}
