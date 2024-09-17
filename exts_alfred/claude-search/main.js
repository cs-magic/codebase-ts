const puppeteer = require("puppeteer");

async function claudeSearch(query = "hello world") {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://claude.ai");
  await page.waitForSelector(
    "main div[aria-label='Write your prompt to Claude'] div[contenteditable='true']",
  );
  await page.keyboard.type(query);
  await page.keyboard.press("Enter");

  // 保持浏览器打开
  // await browser.close();
}

const query = process.argv[2];
void claudeSearch(query);
