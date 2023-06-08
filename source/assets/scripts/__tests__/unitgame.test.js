/**
 * @jest-environment jsdom
 */
const game = require("../game");
const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("source/game.html");
require("../game");

/**
 * Initialize mock tarot object
 */
jest.mock("../../tarot.js", () => ({
  tarot: [{ name: "bob", suite: "major" }],
}));
const tarotConfig = require("../../tarot.js");

/**
 * Test to see if getTarotCardName return the correct values
 */
describe("test suite for function getTarotCardName", () => {
  test("check number of names is as expected", () => {
    expect(game.getTarotCardName(tarotConfig).length).toEqual(1);
  });
  test("check content of names is as expected", () => {
    expect(game.getTarotCardName(tarotConfig)).toEqual(["bob"]);
  });
});
