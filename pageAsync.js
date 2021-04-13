/**
 * Created by Шпортак on 25.06.2018.
 */
/**
 * Created by Шпортак on 08.05.2018.
 */

const puppeteer = require("puppeteer");
const nodemailer = require("nodemailer");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

let config = {
  url1: {
    url:
      "https://rmis.registratura96.ru/#!/group/department_34860/service/3712099/resource/26776943/planning/2019/04/!/",
    name: "Игумнова",
    client: "Шпортак Илья",
    polis: "6696789748001959",
    day: "01",
    month: "03",
    year: "2012",
    phone: "+9126920811"
  },
  url2: {
    url:
      "https://rmis.registratura96.ru/#!/group/department_34860/service/3712096/resource/150764766/planning/2019/02/!/",
    name: "chichakyan",
    client: "Меньшенин Данил Анатольевич",
    polis: "6688989729000901",
    day: "20",
    month: "11",
    year: "2010",
    phone: "+79126920811"
  },
  url3: {
    url:
      "https://rmis.registratura96.ru/#!/group/department_34860/service/3712096/resource/26599401/planning/2019/02/!/",
    name: "pashkov",
    client: "Меньшенин Данил Анатольевич",
    polis: "6688989729000901",
    day: "20",
    month: "11",
    year: "2010",
    phone: "+79126920811"
  },
  url4: {
    url:
      "https://rmis.registratura96.ru/#!/group/department_34860/service/3712096/resource/26588806/planning/2019/02/!/",
    name: "hirurg",
    client: "shportak ilya",
    polis: "6696789748001959",
    day: "01",
    month: "03",
    year: "2012",
    phone: "+79126920811"
  },
  url5: {
    url:
      "https://rmis.registratura96.ru/#!/group/department_34860/service/3712099/resource/26776943/planning/2019/02/!/",
    name: "igumnova",
    client: "Pavkina snegana",
    polis: "6696789777001631",
    day: "22",
    month: "03",
    year: "2012",
    phone: "+79506453309"
  }
};
//let count = 0;
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: ""
  }
});
let asyncPage = async (browser, data) => {
  const page = await browser.newPage();
  await page.goto(data.url);
  await page.setViewport({ width: 1920, height: 1080 });
  await page.waitFor(600);
  const dayLink = "a.day-link.animated-button";
  let count = 0;
  let result = await page.$$(dayLink);
  while (!result.length) {
    count++;
    console.log(count);
    await page.waitForSelector("a.day-link");
    result = await page.$$(dayLink);
    await page.reload();
  }
  //********************************************************
  if (result.length) {
    await page.waitForSelector(dayLink);
    let mailOptions = {
      from: "",
      to: "",
      subject: "Отчет о наличии талонов у стоматолога",
      text: `Появились талоны  у ${data.name}
                 'polis':${data.polis},
                 'day':${data.day},
                 'month':${data.month},
                 'year':${data.year},
                 'phone':${data.phone},
                 'client':${data.client}
                 //--${new Date()}--//`
    };
    try {
      await page.$$(dayLink);
      await page.click(dayLink);
      await page.waitFor(300);
      const timeLink = "a.time.animated-button";
      await page.waitForSelector(timeLink);
      await page.click(timeLink);
      await page.waitFor(300);
      const agreeLink = "div.btn-def-container:nth-child(14) > a:nth-child(1)";
      await page.waitForSelector(agreeLink);
      await page.click(agreeLink);
      await page.waitFor(300);
      await page.type("#authDocumentNumber", data.polis);
      await page.type("#birthDate", data.day);
      await page.type("#month", data.month);
      await page.type("#year", data.year);
      await page.click("#doAuth");
      const phoneInput = "#value";
      await page.waitForSelector(phoneInput);
      await page.type(phoneInput, data.phone);
      const agreePhoneLink = "#confirmValue";
      await page.waitForSelector(agreePhoneLink);
      await page.click(agreePhoneLink);
      await page.waitFor(300);
      await page.screenshot({ path: `examplee${count}.png` });
      const quitLk = "#header-btn-mylk-exit";
      await page.waitForSelector(quitLk);
      await page.click(quitLk);
      await asyncPage(browser, data.url);
      //scrape(config).then(value => {});
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (e) {
      console.log("there was an error");
      console.log(e);
      await page.close();
    }
    //********************************************************

    await page.close();
  }
};
let scrape = async data => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 30,
    ignoreHTTPSErrors: true
  });
  await Promise.all([
    asyncPage(browser, data.url1)
    //asyncPage(browser, data.url3)
    //asyncPage(browser, data.url3),
    //asyncPage(browser, data.url4)
  ]).then(orderItems);
  await browser.close();
};
scrape(config).then(value => {});
