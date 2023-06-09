# CSE110 Team #17 Prototype Documentation

Video Demonstration: 
https://youtu.be/lCl1xWMRJa4 

Presentation on AI:
https://docs.google.com/presentation/d/1vuBBs1mlLeU0Bzm6ubc-O32pri33z8rgMYgwY1wobr0/edit?usp=sharing

## Features
1. ChatGPT generated code for HTML, CSS, Javascript
3. AI generated voice recordings of results
4. Auto-play of the voice recordings when it is revealed
5. Crack opening animation on

## How to run the exploratory prototype
1. Download all the files in this directory(exploratory/)
    1. static/
    2. index.html
    3. style.css
    4. script.js
2. Open the project in VSCode(other IDE)
3. Open Terminal
4. `$ pwd` to get path
5. Enter `<path> + index.html` in your browser.

## Challenge and Solution
**GPT Code Quality**\
Challenge: Code generated by ChatGPT was sometimes buggy or would not work as intended.\
Solution: We had two solutions to this problem. We would like to describe the first approach as the “brute force approach” with AI. Using the “brute force approach”, when we encounter a bug or an error with our code, we would copy and paste our current javascript file into GPT and tell it what error we got. It rarely solved the bug. We would have to ask it multiple times for GPT to come up with a working version of the JS file. 

Another approach was to understand and learn the code. This approach worked better with GPT and without. Pinpointing the GPT what we think is wrong with the code made it faster at detecting error in our code. This approach required more time, because we had to look into libraries if we did not know what certain methods did or behaved. However, we noticed that it would be more beneficial for code quality and we would save more time if we just write the code ourselves based on our design choices and knowledge. Our team has the ability to read into libraries and APIs to figure out what needs to be implemented/fixed. Thus, reading and understanding API docs were the most important solutions to this challenge.

To sum up, when some piece of code does not behave the way we want or gives us an error, our best approach would be to understand the code fully using libraries and API docs and then to fix it accordingly.


## Testing
Our team explored tests through the node packages: Jest and Pupeteer.
1. Jest: a javascript testing framework that can be used to perform unit tests on functions in JS files. We believe we are definitely going to use this framework for our actual project!
2. Pupeteer: a javascript framework that allows crawling (kind of like Selenium). We believe that pupeteer can be used for stress testing. 
  
  
Animation Citation:
https://codepen.io/jkantner/pen/VJMGLR
