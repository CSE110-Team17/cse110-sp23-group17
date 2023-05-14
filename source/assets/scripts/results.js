// Pull from an array containing all the cards that were chosen
const chosenCards = [];

// Get the container elements for each card
const cardContainers = document.getElementsByClassName('card');

// Loop through the chosenCards array to update each card
for (let i = 0; i < chosenCards.length; i++) {
  const card = chosenCards[i];
  const cardContainer = cardContainers[i];
  const cardImg = cardContainer.querySelector('img');
  const cardName = cardContainer.querySelector('h1');
  const cardDesc = cardContainer.querySelector('p');

  // Display card, image, name, and description
  cardImg.src = card.image;
  cardName.textContent = card.name;
  cardDesc.textContent = card.description;
}

//change functionality for mobile screens
