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

  //FOR RESULT PAGE: array of all the selected cards during game play
  const chosenCards = [];

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
    console.log(card);
    console.log(card.dataset);

    if (
      card.dataset.status === "clicked" ||
      luck === 0 ||
      luck > 100 ||
      chosenCards.length === 4
    ) {
      return;
    }

    // 50-50 chance that the card is upside-down
    const isDown = Math.random() < 0.5;

    if (isDown) {
      setLuck(Math.max(0, luck - getBarWidth()));
    } else {
      setLuck(Math.max(0, luck + getBarWidth()));
    }

    if (luck === 0 || luck === 100) {
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
        if (isDown) {
          card.style.transform = "rotate(180deg)";
        }
        card.dataset.status = "clicked";
      }
    });

    // Random generate a damage point and attack the oponent with that point.
    // Change the hp bar of opponent accordingly.
    //const randDmg = Math.floor(Math.random() * 10) + 34;
    // if (isDown) {
    //   randDmg = randDmg*(-1);
    // }
    if (isDown) {
      say(
        "You got a reverse " +
          cardName +
          " card. You receive " +
          getBarWidth() * -1 +
          " luck points!"
      );
    } else {
      say(
        "You got a " +
          cardName +
          " card. You receive " +
          getBarWidth() +
          " luck points!"
      );
    }

    setTimeout(() => {
      if (chosenCards.length === 4) {
        say("Get ready to see your fortune!");
        setTimeout(() => {
          localStorage.setItem("chosenCards", JSON.stringify(chosenCards));
          localStorage.setItem("luck", luck);
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
    }, 2000);
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
