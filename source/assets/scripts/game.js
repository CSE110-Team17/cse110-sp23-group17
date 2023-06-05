import tarotConfig from "../tarot.js";

window.addEventListener("DOMContentLoaded", init);

function init() {
  const player = document.querySelector(".player");
  const playerImage = player.querySelector("img");
  const cards = document.querySelectorAll(".card-img");

  const opponentHealthBarFill = document.querySelector(
    ".opponent .health-bar .fill"
  );
  const opponentHealthLabel = document.querySelector(".opponent #health-label");
  const oscillatingBar = document.querySelector("#oscillating-bar");
  const oscillatingBarFill = document.querySelector("#oscillating-bar > .fill");

  /** Modal for showing alerts **/
  const modal = document.querySelector(".modal");
  const span = document.querySelector(".close");
  const mText = document.querySelector(".modal-text");

  playerImage.src = window.localStorage.getItem("userImage");

  const startingHealth = 50;
  let health;
  setHealth(startingHealth);

  //FOR RESULT PAGE: array of all the selected cards during game play
  const chosenCards = [];

  //listen whenever a card is click
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", onCardClicked);
  }

  /**
   * Display modal with custom message
   * @param: message: alert message
   */
  function displayModal(message) {
    mText.textContent = message;
    modal.style.display = "block";
  }

  /**
   * Hide modal when user clicks outside modal
   */
  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  /**
   * Play the game when a card is click:
   * Generate random card name -> change image accoridngly
   * Generate random damage points -> change hp bar accordingly
   * @param {MouseEvent} event - the value return by the event
   *
   */
  function onCardClicked(event) {
    const card = event.target;
    console.log(card);
    console.log(card.dataset);

    if (card.dataset.status === "clicked" || health === 0 || health > 100) {
      return;
    }

    //is this number is <= 5 then the card is down
    let isDown= Math.floor(Math.random() * 10) + 1;
    if (isDown <= 5){
      setHealth(Math.max(0, health - getBarWidth()));
    } else {
      setHealth(Math.max(0, health + getBarWidth()));
    }
    

    if (health === 0 || health === 100) {
      oscillatingBar.style.visibility = "hidden";
    }

    // Random generate a card. If card is already chosen then generate another card
    let randNameIdx = Math.floor(Math.random() * 21);
    let cardName = getTarotCardName(tarotConfig)[randNameIdx];
    while (chosenCards.includes(cardName)) {
      randNameIdx = Math.floor(Math.random() * 21);
      cardName = getTarotCardName(tarotConfig)[randNameIdx];
    }
    chosenCards.push(cardName);
    console.log(chosenCards);



    // Change the image according to the card got chosen
    tarotConfig.tarot.forEach((element) => {
      if (element.name === cardName) {
        card.src = element.image;
        console.log(isDown);
        if (isDown <= 5){
          card.style.transform = 'rotate(180deg)';
        } 
        card.dataset.status = "clicked";
      }
    });

    // Random generate a damage point and attack the oponent with that point.
    // Change the hp bar of opponent accordingly.
    //const randDmg = Math.floor(Math.random() * 10) + 34;
    // if (isDown <= 5){
    //   randDmg = randDmg*(-1);
    // }
    if (isDown <= 5){
      displayModal("You got a reverse " + cardName + " card. You receive " + getBarWidth()*(-1) + " luck points");
    } else {
      displayModal("You got a " + cardName + " card. You receive " + getBarWidth() + " luck points");
    }
    setTimeout(() => {
      setTimeout(() => {
        if (health <= 0 || health >= 100 || chosenCards.length === 4) {
          displayModal("You defeated the oponent");
          setTimeout(() => {
            localStorage.setItem("chosenCards", JSON.stringify(chosenCards));
            window.location.href = "./results.html";
          }, 500);
        }
      }, 300);
    }, 500);
  }

  function setHealth(val) {
    if (val > 100){
      val = 100;
    }
    health = val;
    opponentHealthLabel.innerText = `${health} luck points`;
    opponentHealthBarFill.style.width = `${health}%`;
  }

  function getBarWidth() {
    const barWidth = oscillatingBarFill.getBoundingClientRect().width;
    const parentWidth = oscillatingBar.getBoundingClientRect().width;
    return Math.floor((25 * barWidth) / parentWidth);
  }
}

/**
 * Create an array of 22 and parse all the card name from json file
 * @param {Array<*>} tarotConfig - an array of the tarot cards from json
 * @return {Array<string>} array contains 22 tarot cards' name
 */
export function getTarotCardName(tarotConfig) {
  const tarotCardNames = [];
  tarotConfig["tarot"].forEach((element) => {
    tarotCardNames.push(element["name"]);
  });
  return tarotCardNames;
}
<<<<<<< HEAD
=======

//FOR RESULT PAGE: array of all the selected cards during game play
const chosenCards = [];

//listen whenever a card is click
var card = document.getElementsByClassName("card");
for (let i = 0; i < card.length; i++) {
  card[i].addEventListener("click", play);
}

// /**
// Check if an element is in the array
// @param: arr: array, el: element
// @return: true if element is in array and false otherwise
// */
// function isInArray(arr, el) {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === el) {
//       return true;
//     }
//   }
//   return false;
// }

/**
 * Play the game when a card is click:
 * Generate random card name -> change image accoridngly
 * Generate random damage points -> change hp bar accordingly
 * @param {*} event - the value return by the event
 *
 */
function play(event) {
  // Random generate a card. If card is already chosen then generate another card
  var randNameIdx = Math.floor(Math.random() * 21);
  var cardName = getTarotCardName(tarotConfig)[randNameIdx];
  while (chosenCards.includes(cardName)) {
    randNameIdx = Math.floor(Math.random() * 21);
    cardName = getTarotCardName(tarotConfig)[randNameIdx];
  }
  chosenCards.push(cardName);
  console.log(chosenCards);

  // Change the image according to the card got chosen
  tarotConfig["tarot"].forEach((element) => {
    if (element["name"] === cardName) {
      event.target.src = element["image"];
    }
  });

  // Random generate a damage point and attack the oponent with that point.
  // Change the hp bar of oponent accordingly.
  var randDmg = Math.floor(Math.random() * 10) + 34;
  setTimeout(() => {
    alert("You dealt " + randDmg + " damage to the opponent");
    var hpBar = document.getElementById("opponent_hp");
    hpBar.value = hpBar.value - randDmg;
    setTimeout(() => {
      if (hpBar.value <= 0) {
        alert("You defeated the oponent");
        setTimeout(() => {
          localStorage.setItem("chosenCards", JSON.stringify(chosenCards));
          window.location.href = "./results.html";
        }, 500);
      }
    }, 300);
  }, 500);
}
>>>>>>> dev
