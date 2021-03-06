const puppeteer = require("puppeteer");
const config = require("./config");
const isAuthLink = 'a.def-btn.authorized'
let asyncPage = async (browser, data, iterator) => {
  iterator++;
  const page = await browser.newPage();
  await page.goto('https://rmis.registratura96.ru/#!/group/department_34860/service/3712098/!/');
  // await page.goto(data.url);
  await page.setViewport({ width: 1920, height: 1080 });
  // await page.waitForTimeout(600);
  await authUser(page, data)
  await page.goto(data.url);
  const dayLink =
    'a.day-link.animated-button > span.day-desc:not([title = "Все занято"])';
  await page.waitForSelector("a.day-link");
  let count = 0;
  try {
    let result = await page.$$(dayLink);
    while (!result.length) {
      count++;
      //console.log(
      // `${iterator}x${count}---###---${data.client}___( ${data.number} )__`
      //);
      await page.waitForSelector("a.day-link");
      result = await page.$$(dayLink);
      await page.reload();
      if (count > 98) {
        await page.close();
        console.log(
          `${data.client} к специалисту ${
            data.name
          } пошел по ${iterator} кругу время ${new Date()}`
        );
        await asyncPage(browser, data, iterator);
      }
    }
    if (result.length) {
      await page.waitForSelector(dayLink);
      await page.$$(dayLink);
      await page.click(dayLink);
      await page.waitForTimeout(300);
      const timeLink = "a.time.animated-button";
      await page.waitForSelector(timeLink);
      await page.click(timeLink);
      await page.waitForTimeout(300);
      const agreeLink = "div.btn-def-container:nth-child(14) > a:nth-child(1)";
      await page.waitForSelector(agreeLink);
      const newPageUrl = page.url().replace(/disclaimer/g, "contact");
      await page.goto(newPageUrl);
      if(await page.$(isAuthLink) !== null) {
        const authDocumentLink = "#authDocumentNumber";
        await page.waitForSelector(authDocumentLink);
        await page.waitForTimeout(700);
        await page.type("#authDocumentNumber", data.polis);
        await page.type("#birthDate", data.day);
        await page.type("#month", data.month);
        await page.type("#year", data.year);
        await page.click("#doAuth");
      }
      const phoneInput = "#value";
      await page.waitForSelector(phoneInput);
      await page.type(phoneInput, data.phone);
      const agreePhoneLink = "#confirmValue";
      await page.waitForSelector(agreePhoneLink);
      await page.waitForTimeout(300);
      await page.click(agreePhoneLink);
      await page.waitForTimeout(300);
      await page.screenshot({ path: `screenShot${count}.png` });
      const quitLk = "#header-btn-mylk-exit";
      await page.waitForSelector(quitLk);
      await page.click(quitLk);
      await asyncPage(browser, data.url);
      await page.close();
    }
  } catch (e) {
    console.log(`
    ************************()**************************
    Произошла ошибка в скрипте ${data.number}, скрипт будет перезапущен
    ************************()**************************
    `);
    // console.log(e);
    await asyncPage(browser, data, iterator);
    await page.close();
  }
  return null
};
let scrape = async (data) => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 15,
    ignoreHTTPSErrors: true,
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--enable-features=NetworkService",
    ],
  });
  let iterator = 0;
  await Promise.all([
    asyncPage(browser, data.url1, iterator),
    // asyncPage(browser, data.url2, iterator),
    // asyncPage(browser, data.url3, iterator),
    // asyncPage(browser, data.url4, iterator)
    // asyncPage(browser, data.url5, iterator)
    // asyncPage(browser, data.url6, iterator)
  ]).then((orderItems) => {
    console.log(orderItems);
  });
  await browser.close();
};
scrape(config)
  .then((value) => {})
  .catch((e) => {
    console.log(`${e}`);
  });

async function  authUser(page, data ){
  const lkLink = 'a.def-btn.brown-small.left-icon16.icon-mylk.animated-button'
  const isAuthLink = 'a.def-btn.authorized'
  await page.waitForSelector(lkLink);
  if(await page.$(isAuthLink) !== null) {
    console.log("-> page.$(isAuthLink)", page.$(isAuthLink));
    return page
  }
  await page.$$(lkLink);
  await page.click(lkLink);
  const authDocumentLink = "#authDocumentNumber";
  await page.waitForSelector(authDocumentLink);
  await page.waitForTimeout(1700);
  await page.type("#authDocumentNumber", data.polis);
  await page.type("#birthDate", data.day);
  await page.type("#month", data.month);
  await page.type("#year", data.year);
  await page.click("#doAuth");
  return page
}