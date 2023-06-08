/**
 * @jest-environment puppeteer
 */

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

  it("Make sure clicking the X label goes back to game page", async () => {
    //click how to play for popup box
    let popupLink = "#popup-box";
    const tutorialButton = await page.$(`a[href='${popupLink}']`);
    await Promise.all([page.waitForNavigation(), tutorialButton.click()]);
    //click the x to close
    const xButton = await page.$(".box-close");
    await Promise.all([page.waitForNavigation(), xButton.click()]);
    let expectedPageLink =
      "https://cse110-team17.github.io/cse110-sp23-group17/source/game.html#";
    const url = await page.evaluate(() => document.location.href);
    expect(url).toEqual(expectedPageLink);
  }, 5000);

  it("Check clicking one div btn outputs status", async () => {
    const card = await page.$("#card-1");
    await card.click();
    const status = await page.$eval("#card-1 img", (el) =>
      el.getAttribute("data-status")
    );
    expect(status).toBe("clicked");
  }, 5000);

  it("Check that after clicking 4 cards, cannot click another", async () => {
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

  it("");
});
