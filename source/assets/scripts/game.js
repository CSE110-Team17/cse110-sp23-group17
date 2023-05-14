import tarotConfig from '/source/assets/tarot.json' assert { type: 'json' };

/*
Create an array of 22 and parse all the card name from json file
*/
const tarotCardNames = [];
tarotConfig['tarot'].forEach(element => {
    tarotCardNames.push(element['name']);
});
console.log(tarotCardNames);

//FOR RESULT PAGE: array of all the selected cards during game play
const chosenCards = [];

/*
listen whenever a card is click 
*/
var card = document.getElementsByClassName("card"); 
for (let i = 0; i < card.length; i++){
    card[i].addEventListener('click', play);
}

/*
Check if an element is in the array
@param: arr: array, el: element
@return: true if element is in array and false otherwise
*/
function isInArray(arr, el){
    for (let i = 0; i < arr.length; i++){
        if (arr[i] === el){
            return true;
        }
    }
    return false;
}

/*
Game play when a card is click:
- Generate random card name -> change image accoridngly
- Generate random damage points -> change hp bar accordingly
*/
function play(event){

    /*
    Random generate a card. If card is already chosen then generate another card
    */
    var randNameIdx = Math.floor(Math.random() * 21);
    var cardName = tarotCardNames[randNameIdx];
    while (isInArray(chosenCards, cardName)){
        randNameIdx = Math.floor(Math.random() * 21);
        cardName = tarotCardNames[randNameIdx];
    }
    chosenCards.push(cardName);

    /*
    Change the image according to the card got chosen 
    */
    tarotConfig['tarot'].forEach(element => {
        if (element['name'] === cardName){
            event.target.src = element['image'];
        }
    });

    /*
    Random generate a damage point and attack the oponent with that point.
    Change the hp bar of oponent accordingly.
    */
    var randDmg = Math.floor(Math.random() * 10) + 34;
    setTimeout(() => { 
        alert("You deal " + randDmg + " damage to the opponent"); 
        var hpBar = document.getElementById('opponent_hp');
        hpBar.value = hpBar.value - randDmg;
        setTimeout(() => { 
            if (hpBar.value <= 0){
                alert("You defeat the oponent");
                setTimeout(() => {
                    window.location.href = "http://127.0.0.1:5500/source/results.html";
                }, 500);
            }
        }, 300);
    }, 500);

}

//Should display all the chosen cards in order
console.log(chosenCards);



