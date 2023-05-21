# What is the decision?

- We choose to use local storage instead of any cloud, hub or server. For details, we store our tarot card inside the json file, which include all the card name, image of the card, fortune intepretation of each card and more. 

- Json will also be the space where we store any data that we collect during the game process or user input. We will transfer and use the data between files also through json by parsing and adding into the json file. 

# Why choose local storage?

## Local first software
- Using local storage allow us to have a practice of implement local first software, which is a set of principles for software that enale both collaborattion and ownership for the user. This will give us as developers more power and flexibility over data, as we don't have to go through any server when modidify our data. It will also easier to access the data locally since there is no restrictions that might be required from the host server, such as certain server will limit number of api calls in a day or you will have to pay them to get more calls. 

## When the server break down
- If a server is shut down, the software stop function and all data might be lost. By using local storage, we can avoid this flaw and make sure that there will be no lost of data or worry the fact that our software might be break down unpredictably and we have no control over it. Because if we use a server and the server break down, then your team will be in a passive prosisiton where you can only count on the main server to be fixed in the meantime. 

## Go Offline
- Another pro of using local storage is that you can run your software while offline. This function will make it easier for both the user and the developer. 

