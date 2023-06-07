# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Tarot but Game](https://github.com/CSE110-Team17/cse110-sp23-group17).

## [Unreleased]

### Added 
- All Cards feature (displays all the possible cards you can get) (#69)
- add how-to-play button in game page so that the user can see game instructions anytime (#66)

### Changed
- How to play instructions are changed to match the new gameplay (#66)
- changed the back button to match the design theme (#66)

## [0.4] - 2023-6-6

### Added
- added lucky points (Very Unclucky: 0-25, Unlucky: 25-50, Lucky: 50-75, Very Lucky: 75-100) (#68)
- progress bar that go back and front (when click a card, the value of the progress bar will be the damage) (#54)
- short-term fortune: lucky points ("How Your Luck Looks")
- long-term fortune: card fortunes ("Your Overall Fortune")

### Fixed
- fixed css hover effect on Camera Page (#61)
- fixed no image found when clicking next without any selector on Camera Page (#61)

### Changed
- Camera Page UI Design (#61)
- Camera Page now scalable to moble (#61)
- Update Unit Tests Results Page (#68)
- changed attack damage alert message to a modal box (#54)
- results page always displays 4 cards (#62)
- new card descriptions

### Removed
- removed "Card Position Represetation" (#62)

## [0.3] - 2023-5-30

### Added
- added CHANGELOG.md
- Unit Tests Game Page (#29)
- Unit Tests Results Page (#30)
- oscillating bar that corresponds to attack damage
- can now select 2-4 cards depending on how much cards it takes to defeat the opponent

### Fixed
- Linting errors in JS files (#48)

### Changed
- increased the margins for results card descriptions (#51)

### Removed
- removed "Card Name" (#51)

## [0.2] - 2023-05-28

### Added
- deployed Tarot but Game to Github Pages
- Prettier formatting
- CI/CD Pipeline
- Eslint to CI/CD Pipeline
- added Sprint Retrospective
- Camera Page Outline (#31)
- JS for Camera Page (#31)
  - can take a picture with device camera or use an exisiting photo to change the user picture
- "Here is What Your Future Holds" text in Results Page (#28)
- added CONTRIBUTING.md

### Fixed

- fixed bug for images size (#23)
- fix bug when click the same card (#24)
- fixed button appearing in web version of Results Page
- fixed button display in mobile version of results page (#28)
- fixed readability in Results Page (#28) (improved margins)

### Changed

- make the Welcome Page fit mobile screen (#25)
- changed theme of Game Page (#27)
- make the Game Page fit mobile screen (#27)
- changed the layout of Results Page (#28) 
- changed theme of Results Page (#28)

## [0.1] - 2023-05-16

### Added

- Welcome Page Outline (#13)
  - title, subtitle, "how to play" and "play" button
- Instructions Page Outline (#4)
  - describe objective and rules of the game
- Game Page Outline (#1)
  - opponent/user stage areas, 22 cards, HP bar/display
- Results Page Outline (#2)
  - mobile version shows one card at a time with "next" and "previous" buttons to show a different card
- Tarot Card Information (#5)
- JS for Results Page (#7)
  - display cards and descriptions that is chosen in game play, allow "next" and "previous" buttons to work on mobile version
- JS for Game Page (#6)
  - generate random card when clicked, opponent HP decrease according to damage points, display game ending message when opponent HP is lower than 0
- Initial Theme Design in Welcome Page