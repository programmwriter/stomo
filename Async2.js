const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const config = require("./config");

let asyncPage = async (browser, data, iterator) => {
  iterator++;
  const page = await browser.newPage();
  await page.goto(data.url);
  await page.setViewport({ width: 1920, height: 1080 });
  await page.waitFor(600);
  const dayLink = "a.day-link.animated-button>span.day-desc:not([title])"; //"[title = 'Все занято']";#body-wrapper-2 > section > div > a:nth-child(20) > span.day-desc
  let result = await page.$$(dayLink);
  console.log(result[2]);
  // const dayLink = "a.day-link.animated-button";
  // let count = 0;
  // let result = await page.$$(dayLink);
  // while (!result.length) {
  //   count++;
  //   //console.log(count);
  //   await page.waitForSelector("a.day-link");
  //   result = await page.$$(dayLink);
  //   await page.reload();
  //   if (count > 98) {
  //     await page.close();
  //     console.log(
  //       `${data.client} пошел по ${iterator} кругу время ${new Date()}`
  //     );
  //     await asyncPage(browser, data, iterator);
  //   }
  // }
  //********************************************************
  // if (result.length) {
  //   await page.waitForSelector(dayLink);
  //   try {
  //     await page.$$(dayLink);
  //     await page.click(dayLink);
  //     await page.waitFor(300);
  //     const timeLink = "a.time.animated-button";
  //     await page.waitForSelector(timeLink);
  //     await page.click(timeLink);
  //     await page.waitFor(300);
  //     const agreeLink = "div.btn-def-container:nth-child(14) > a:nth-child(1)";
  //     await page.waitForSelector(agreeLink);
  //     await page.click(agreeLink);
  //     await page.waitFor(300);
  //     await page.type("#authDocumentNumber", data.polis);
  //     await page.type("#birthDate", data.day);
  //     await page.type("#month", data.month);
  //     await page.type("#year", data.year);
  //     await page.click("#doAuth");
  //     const phoneInput = "#value";
  //     await page.waitForSelector(phoneInput);
  //     await page.type(phoneInput, data.phone);
  //     const agreePhoneLink = "#confirmValue";
  //     await page.waitForSelector(agreePhoneLink);
  //     await page.click(agreePhoneLink);
  //     await page.waitFor(300);
  //     await page.screenshot({ path: `examplee${count}.png` });
  //     const quitLk = "#header-btn-mylk-exit";
  //     await page.waitForSelector(quitLk);
  //     await page.click(quitLk);
  //     await asyncPage(browser, data.url);
  //   } catch (e) {
  //     console.log("there was an error");
  //     console.log(e);
  //     await page.close();
  //   }
  //   //********************************************************

  //   await page.close();
  // }
};
let scrape = async data => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 15,
    ignoreHTTPSErrors: true
  });
  let iterator = 0;
  await Promise.all([
    asyncPage(browser, data.url1, iterator)
    // asyncPage(browser, data.url2, iterator)
    // asyncPage(browser, data.url3, iterator),
    // asyncPage(browser, data.url4, iterator),
    // asyncPage(browser, data.url5, iterator)
    // asyncPage(browser, data.url6, iterator)
  ]).then(orderItems);
  await browser.close();
};
scrape(config).then(value => {});
