import tarotConfig from '/source/assets/tarot.json' assert { type: 'json' };

// Transform tarotConfig to a hashmap indexed by card name
const tarotMap = {};
tarotConfig['tarot'].forEach((card) => {
  tarotMap[card.name] = {
    suite: card.suite,
    image: card.image,
    description: card.description,
    interpretation: card.interpretation,
  };
});

// Pull selected cards from game.js
let chosenCards = JSON.parse(localStorage.getItem('chosenCards'));
chosenCards = Object.values(chosenCards).map(String);

const cardContainers = document.getElementsByClassName('card');

// Update results
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

// Need to add functionality for mobile screens still
