import tarotConfig from "../tarot.json" assert { type: "json" };

window.addEventListener("DOMContentLoaded", init);

/**
 * Initialize the game play and set player image from localStorage
 */
function init() {
  const player = document.querySelector(".player");
  const playerImage = player.querySelector("img");
  // const dataImage = window.localStorage.getItem('userImage');
  playerImage.src = window.localStorage.getItem("userImage");
}

/**
 * Create an array of 22 and parse all the card name from json file
 * @param {Array<*>} tarotConfig - an array of the tarot cards from json
 * @return {Array[string]} array contains 22 tarot cards' name
 */
export function getTarotCardName(tarotConfig) {
  const tarotCardNames = [];
  tarotConfig["tarot"].forEach((element) => {
    tarotCardNames.push(element["name"]);
  });
  return tarotCardNames;
}
// function readURL(input) {
//   if (input.files && input.files[0]) {
//     let reader = new FileReader();
//     let output = document.getElementById("#output");
//     reader.onload = function (e) {
//       output.src = e.target.result;
//       output.hide();
//       output.fadeIn(650);
//     };
//     reader.readAsDataURL(input.files[0]);
//   }
// }
window.loadFile = function (event) {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};

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
