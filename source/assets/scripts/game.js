import tarotConfig from '/source/assets/tarot.json' assert { type: 'json' };

 console.log("hello");

const tarotCardNames = [];
tarotConfig['tarot'].forEach(element => {
    tarotCardNames.push(element['name']);
});
console.log(tarotCardNames);

var card = document.getElementsByClassName("card");

function play(event){
    console.log(event.target.value);
}

card.eventListener('click', play);

