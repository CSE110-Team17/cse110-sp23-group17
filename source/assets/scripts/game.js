import tarotConfig from "../tarot.json" assert { type: "json" };

window.addEventListener("DOMContentLoaded", init);
let health = 100;

/**
 * Initialize the game play and set player image from localStorage
 */
function init() {
  const player = document.querySelector(".player");
  const playerImage = player.querySelector("img");
  playerImage.src = window.localStorage.getItem("userImage");

  const hpBar = document.querySelector(".opponent #health-label");

  function setHealth(val) {
    health = val;
    powerLabel.innerText = `${health} power left`;
    powerBarFill.style.width = `${health}%`;
  }

  function getBarWidth() {
    const oscillatingBar = document.querySelector("#oscillating-bar");
    const oscillatingBarFill = document.querySelector(
      "#oscillating-bar > .fill"
    );
    const barWidth = oscillatingBarFill.getBoundingClientRect().width;
    const parentWidth = oscillatingBar.getBoundingClientRect().width;
    return Math.floor((100 * barWidth) / parentWidth);
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

//FOR RESULT PAGE: array of all the selected cards during game play
const chosenCards = [];

//listen whenever a card is click
const cards = document.getElementsByClassName("card");
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", play);
}

/** Modal for showing alerts **/
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

/**
 * Display modal with custom message
 * @param: message: alert message
 */
function displayModal(message) {
  var mText = document.querySelector(".modal-text");
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
 * @param {*} event - the value return by the event
 *
 */
function play(event) {
  console.log(event.target.dataset);
  if (
    event.target.dataset.status === "clicked" /*|| chosenCards.length === 3*/
  ) {
    return;
  }

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
  tarotConfig.tarot.forEach((element) => {
    if (element.name === cardName) {
      event.target.src = element.image;
      event.target.dataset.status = "clicked";
    }
  });

  // Random generate a damage point and attack the oponent with that point.
  // Change the hp bar of opponent accordingly.
  var randDmg = Math.floor(Math.random() * 10) + 34;
  setTimeout(() => {
    displayModal("You dealt " + randDmg + " damage to the opponent");
    hpBar.value = hpBar.value - randDmg;
    setTimeout(() => {
      if (hpBar.value <= 0) {
        displayModal("You defeated the oponent");
        setTimeout(() => {
          localStorage.setItem("chosenCards", JSON.stringify(chosenCards));
          window.location.href = "./results.html";
        }, 500);
      }
    }, 300);
  }, 500);
}
