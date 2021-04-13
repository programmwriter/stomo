const puppeteer = require("puppeteer");

let config = {
  url1: {
    url: "https://rmis.registratura96.ru/#!/clinics/",
    name: "kesareva",
    client: "Jilcova darya",
    polis: "6655320843001113",
    day: "06",
    month: "04",
    year: "1976",
    phone: "+79122340070"
  },
  url2: {
    url: "https://rmis.registratura96.ru/#!/clinics/page/2/size/21/!/",
    name: "kesareva",
    client: "Jilcova darya",
    polis: "6655320843001113",
    day: "06",
    month: "04",
    year: "1976",
    phone: "+79122340070"
  }
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 20,
    ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();
  await page.goto("https://rmis.registratura96.ru/#!/clinics/");
  await page.waitForSelector(
    "#body-wrapper-2 > section > div > a:nth-child(1)"
  );
  // Get the "viewport" of the page, as reported by the page.
  // const dimensions = await page.$eval("div.wrap-or5m18s9qs", divs => divs);
  const dimensions = await page.$$eval("a.clinic-link", divs => {
    let arr = [];
    divs.map(item => {
      // arr.push({ city: item.children[0].innerHTML, url: item.href });
      arr.push({ city: item.innerText, url: item.href });
    });
    return arr;
  });

  console.log("Dimensions:", dimensions);

  await browser.close();
})();
