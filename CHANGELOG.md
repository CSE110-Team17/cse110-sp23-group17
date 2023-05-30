# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Tarot but Game](https://github.com/CSE110-Team17/cse110-sp23-group17).

## [Unreleased]

### Added
- added CHANGELOG.md
- Unit Tests Game Page
- Unit Tests Results Page

### Fixed
- Linting errors in JS files

## [0.2] - 2023-05-28

### Added
- deployed Tarot but Game to Github Pages
- Prettier formatting
- CI/CD Pipeline
- Eslint to CI/CD Pipeline
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