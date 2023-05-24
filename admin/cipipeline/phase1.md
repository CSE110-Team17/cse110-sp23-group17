# CI/CD Pipeline Documentation

## Prettier Linter
We implemented a Prettier linter as a Github Action. This action is triggered by a push to any of our branches(main, front-dev, and back-dev) to prevent any code style differences between future merges. The outcome of the linter is binary: either pass all the test, or fail with error. If error is found, it tells you exactly what to do. It specifies which files are causing the issue using it error messages. "-" in front of lines mean that the particular lines have to be redacted. "+", similarly, is an addtion to make. This particular linter follows behavior of Prettier, a popular linting option, which is available on VS Code(our primary IDE) as an extension. In addition, our linter checks for all html, css, and javascript files for Prettier error. Therefore, in order to prevent error arising on push, one should follow these steps on local:
1. Open Command Palette (Command + Shift + P for Mac)
2. Type “Format Document”
3. “Configure” if it’s your first time
4. Use Prettier (default setting)
5. Resolve issues (highlighted with red markers on line numbers)

The specific behaviors of the linter can be found in `.github/workflows/linter.yml`

## Deployment 
We implemented a continuous delivery through Github Action's Static HTML deploy. This action is trigged by a push to **main** branch only. Once some code has been pushed to main, the action will adhere to the following steps: 1) checkout 2) set up pages 3) upload artifact 4) deploy to github pages. This pipeline piece allows us developers to see result of our latest build with no effort. One can simply navigate to `https://cse110-team17.github.io/cse110-sp23-group17/` to view the latest updated web application.

## Work In Progress and Future Direction
Working with above two actions, we were able to reduce significant amount of manual labor to check or deploy our code. Thus, we want to implement more CI/CD pipelines to increase our efficiency and make our lives a little bit easier. Here are some work in progress pipelines.

### Testing
We want to create some unit tests before reaching all the way to deployment, to ensure that our code is not buggy. In order to achieve this, we are currently exploring options of Jest and Mocha. Once we settle on a method, we plan to integrate it into the pipeline.

### Documentation
In order to maintain our code and to adhere to the local-first software's characteristic of working without maintenance for long periods of time, we want to implement documentation for our Javascript functions using JSDocs. We beleive that this will aid anyone to understand our code and increase our internal efficiency.