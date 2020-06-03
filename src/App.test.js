import puppeteer from "puppeteer";

let browser;
let page;

describe("Counter test", () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
  });

  // 1
  it("renders counter", async () => {
    await page.waitForSelector(".header");

    const header = await page.$eval(".header", (e) => e.innerHTML);
    expect(header).toBe("Counter");

    await page.screenshot({ path: "e2e-snapshots/renders-counter.png" });
  });

  // 2
  it("sets initial state to zero", async () => {
    await page.waitForSelector(".counter-app");

    const count = await page.$eval(".count", (e) => e.innerHTML);
    expect(count).toBe("0");

    await page.screenshot({ path: "e2e-snapshots/counter-zero.png" });
  });

  // 3
  it("increments counter by 1", async () => {
    await page.waitForSelector(".counter-app");

    await page.click(".increment");
    const count = await page.$eval(".count", (e) => e.innerHTML);
    expect(count).toBe("1");

    await page.screenshot({
      path: "e2e-snapshots/increments-counter-by-1.png",
    });
  });

  // 4
  it("decrements counter by 1", async () => {
    await page.waitForSelector(".counter-app");

    await page.click(".decrement");
    const count = await page.$eval(".count", (e) => e.innerHTML);
    expect(count).toBe("0");

    await page.screenshot({
      path: "e2e-snapshots/decrements-counter-by-1.png",
    });
  });

  afterAll(() => {
    browser.close();
  });
});
