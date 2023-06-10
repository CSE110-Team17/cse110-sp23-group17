# DERISK OF THE PROJECT
This markdown will discuss about how we derisk during the process of working on our project

## FEATURE CODE
### Concern: 
We worried that adding some big features straight into the local github repo might sometimes cause bugs and destroy local repo. For features like animation or UI, it will also be better if we able to see the design before actually working on the repo directly since the team will have an idea of what is happening and can add their opinions on it. 
### Solution: 
For some big and important feature, we try it out in codepen and test out the component there first. Then we put it on slack so that the team can get an idea of the new feature and how will it look like before actually adding it to branch. 
### Result:
 By this way, we get to see many different design and approach before actually comit it to our repo. Furthermore, if any team is a bit behind than schedule and your code portion need to wait on them, then the teammate can code on codepen.io first them later implemnt it into the repo easily. This method not only help our team work more productive but also increase out project quality.

## GITHUB PROTECTION
### Concern: 
We worried that not having a good github branching structure might lead to merge conflict or loss of code or documentations. It will also dangerous if we don't protect our main branch properly and someone might accidentally delete or replace it. This situation will definiely take a lot of time and efforts to fix and we might face the reality that we have to redo our works for the project. Hence, it is very important that we protect our github.
### Solution: 
We have a main branch, one dev branch, and the other will be feature branch. Both main branch and dev branch have protection where main branch is locked to read only and can only be merged with a pull request that have at least 2 approvals and it can only be merged from dev every tuesday when the whole team have a team meeting. Dev branch, on the other hand, is seen as a secondary main branch, where it is protected and need a pull request with at least one approval to merge. However, team members can also push to dev if they have small fix or fixed that is totally unrelated to the project main code (meaning no conflict). The others will be feature branch which we have works of different features that members work on and they will submit a pull request to merge those branch into dec when they are ready and get at leadt one approval.

We also required the member to not change or use any git comand directly on github, as those will not run github actions and will bypass the branch protection rules. 

### Result: 
By implement this method, we were able to develop continously and we haven't face any code loss or crazy  unsolvable merge conflict. We were able to keep main always safe. Dev will always have the most up to date code, meaning it will have more exposure to mistakes. However, since we have main, which is updated every week after thoroughly check, we don't have to worry if we accidentally mess up with dev branch. 


## BROWSER TESTING
### Concern:
We worried that certain feature will not work on certain brower (mostly safari) but will work perfectly on another brower (mostly chrome/firefox). So we want to make sure that our project can work on different browser.

### Solution:
We use the website caniuse.com to check on what will work on which brower and use that as reference to implement our project. 
We also test continously on differetn browser such as safari and chrome to make sure that our code is flexible and can work on different platform.

### Result: 
Overall, everything have been pretty well. Most features work on both safari and chrome. Though safari still have some glitching bugs and sometimes the network can be unstable, but overall, it can run on safari, though it will run much more smoother in chrome. 

