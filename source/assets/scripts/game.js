import tarotConfig from "../tarot.js";

window.addEventListener("DOMContentLoaded", init);

function init() {
  const playerImage = document.querySelector(".player img");
  const cards = document.querySelectorAll(".card-img");
  const luckLabel = document.querySelector(".luck-bar .label");
  const luckBarFill = document.querySelector(".luck-bar .fill");
  const oscillatingBar = document.querySelector(".oscillating-bar");
  const oscillatingBarFill = document.querySelector(".oscillating-bar .fill");
  const oracleMsg = document.querySelector(".oracle .message");

  playerImage.src = window.localStorage.getItem("userImage");

  const startingLuck = 50;
  let luck;
  setLuck(startingLuck);

  const numCards = 22;
  const numCardsToChoose = 4;
  let numCardsChosen = 0;

  const chosenCardIndices = getShuffledIndices(22).slice(0, numCardsToChoose);
  localStorage.setItem("chosenCardIndices", JSON.stringify(chosenCardIndices));

  //listen whenever a card is clicked
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", onCardClicked);
  }

  /**
   * Play the game when a card is click:
   * Generate random card name -> change image accoridngly
   * Generate random damage points -> change hp bar accordingly
   * @param {MouseEvent} event - the value return by the event
   *
   */
  function onCardClicked(event) {
    const card = event.target;

    if (
      card.dataset.status === "clicked" ||
      numCardsChosen === numCardsToChoose
    ) {
      return;
    }

    const chosenIdx = chosenCardIndices[numCardsChosen++];
    const chosenCard = tarotConfig.tarot[chosenIdx];

    // 50-50 chance that the card is upside-down
    const isDown = Math.random() < 0.5;

    if (isDown) {
      setLuck(Math.max(0, luck - getBarWidth()));
      card.style.transform = "rotate(180deg)";
    } else {
      setLuck(Math.max(0, luck + getBarWidth()));
    }

    if (luck === 0 || luck === 100) {
      oscillatingBar.style.visibility = "hidden";
    }

    card.src = chosenCard.image;

    const cardName = chosenCard.name;

    if (isDown) {
      say(
        `You got a reverse ${cardName} card. You receive ${-getBarWidth()} luck points!`
      );
    } else {
      say(
        `You got a ${cardName} card. You receive ${getBarWidth()} luck points!`
      );
    }

    setTimeout(() => {
      if (numCardsChosen === numCardsToChoose) {
        say("Get ready to see your fortune!");
        setTimeout(() => {
          window.location.href = "./results.html";
        }, 2000);
      }
    }, 2000);
  }

  let msgResetTimeout = -1;

  function say(msg) {
    oracleMsg.innerText = msg;

    clearTimeout(msgResetTimeout);

    msgResetTimeout = setTimeout(() => {
      const numCardsLeft = 4 - chosenCards.length;
      oracleMsg.innerText = `Draw ${numCardsLeft} more card${
        numCardsLeft === 1 ? "" : "s"
      }!`;
    }, 3000);
  }

  function setLuck(val) {
    if (val > 100) val = 100;
    if (val < 0) val = 0;
    luck = val;
    luckLabel.innerText = `${luck} luck points`;
    luckBarFill.style.width = `${luck}%`;
  }

  function getBarWidth() {
    const barWidth = oscillatingBarFill.getBoundingClientRect().width;
    const parentWidth = oscillatingBar.getBoundingClientRect().width;
    return Math.floor((25 * barWidth) / parentWidth);
  }
}

/**
 * Get a shuffled range of numbers from 0 to n-1
 * @param {number} n The number of indeces to shuffle (0 to n-1)
 */
function getShuffledIndices(n) {
  const indices = Array.from({ length: n }, (_, i) => i);

  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  return indices;
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
