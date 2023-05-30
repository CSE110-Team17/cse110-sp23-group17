const game = require("../game");
const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("source/game.html");
require("../game");

/**
 * Initialize fake data for game test
 */
jest.mock("../../tarot.json", () => ({
  tarot: [{ name: "bob", suite: "major" }],
}));
const tarotConfig = require("../../tarot.json");

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
