import tarotConfig from '/source/assets/tarot.json' assert { type: 'json' };

const tarotCardNames = [];
tarotConfig['tarot'].forEach(element => {
    tarotCardNames.push(element['name']);
});
console.log(tarotCardNames);