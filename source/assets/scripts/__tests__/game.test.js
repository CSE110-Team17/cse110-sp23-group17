/**
 * @jest-environment puppeteer
 */

const puppeteer = require("puppeteer");

/**
 * E2E testing of user interactions
 */
describe("E2E button/link testing", () => {
  beforeEach(async () => {
    await page.goto(
      "https://cse110-team17.github.io/cse110-sp23-group17/source/game.html#"
    );
  });
  it("Make sure clicking how to play button goes to href", async () => {
    //click how to play popup box
    let popupLink = "#popup-box";
    const tutorialButton = await page.$(`a[href='${popupLink}']`);
    await Promise.all([page.waitForNavigation(), tutorialButton.click()]);
    let expectedPageLink =
      "https://cse110-team17.github.io/cse110-sp23-group17/source/game.html#popup-box";
    const url = await page.evaluate(() => document.location.href);
    expect(url).toEqual(expectedPageLink);
  }, 5000);

  it("Check clicking one div btn outputs status", async () => {
    await page.reload();
    const card = await page.$("#card-1");
    await card.click();
    const status = await page.$eval("#card-1 img", (el) =>
      el.getAttribute("data-status")
    );
    expect(status).toBe("clicked");
  }, 5000);

  it("Check that after clicking 4 cards, cannot click another", async () => {
    await page.reload();
    const card = await page.$$(".card");
    //click 4 cards
    for (let i = 0; i < 4; i++) {
      await card[i].click();
    }
    //click the 5th card, should remain unclicked
    const fifthCard = await page.$("#card-5");
    await fifthCard.click();
    const status = await page.$eval("#card-5 img", (el) =>
      el.getAttribute("data-status")
    );
    expect(status).toBe("unclicked");
  }, 5000);

  it("After clicking a card, check text content of message displayed to user", async () => {
    await page.reload();
    const card = await page.$("#card-1");
    await card.click();
    const textContent = await page.$eval(".oracle .message", (el) => {
      return el.innerText;
    });
    expect(textContent).toBeDefined();
  }, 5000);
});
describe("Testing local storage contents is as expected", () => {
  beforeEach(async () => {
    await page.goto(
      "https://cse110-team17.github.io/cse110-sp23-group17/source/game.html#"
    );
  });
  it("Check local storage contents for luck being transfered to results page", async () => {
    await page.reload();
    const card = await page.$$(".card");
    //click 4 cards
    for (let i = 0; i < 4; i++) {
      await card[i].click();
    }
    await page.waitForNavigation();
    const localStorage = await page.evaluate(() =>
      localStorage.getItem("luck")
    );
    expect(typeof parseInt(localStorage) === "number").toBe(true);
  }, 10000);

  it("Check local storage contents of chosen cards being transfered to results page", async () => {
    await page.reload();
    const card = await page.$$(".card");
    //click 4 cards
    for (let i = 0; i < 4; i++) {
      await card[i].click();
    }
    await page.waitForNavigation();
    const localStorage = await page.evaluate(() =>
      localStorage.getItem("chosenCards")
    );
    console.log(JSON.parse(localStorage));
    expect(typeof JSON.parse(localStorage) === "object").toBe(true);
  }, 10000);
});
