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
      "https://es.edu-74.ru/Esia/LoginForm?ReturnUrl=%2FModules%2FFIRSTGRADEMODULE%2F%3Fonce%3Dql7Fq28LReTxqVrCiu5LGNrjdQof7LOqzo3k_rYs_lIKm2NLtP8m5ttERPYNKKcOfTZcruQGRIIwOF8c0C65AvOK9EI",
    name: "kesareva",
    client: "Jilcova darya",
    birthday: "28.05.1985",
    palceToBorn: "Верхний Уфалей",
    kodPodrazdeleinya: "740-047",
    Children_FirstName: "Марк",
    Children_LastName: "Ситдиков",
    Children_MiddleName: "Денисович",
    Children_BirthDate: "23.02.2012",
    Children_BirthPlace: "Снежинск",
    Children_Series: "III-ИВ ",
    Children_Number: "575686",
    Children_Issued:
      'отдел ЗАГС администрации муниципального образования "Город  Снежинск" Челябинской области',
    Children_DateIssue: "12.03.2012",
    Children_ActEntry: "124",
    phone: "+89049327546",
    pass: "Cbnlbrjdf,1985"
  },
  url2: {
    url:
      "https://rmis.registratura96.ru/#!/group/department_34860/service/3711482/resource/36031636/planning/2019/02/!/",
    name: "obvinceva",
    client: "Stepanova oksana",
    polis: "6655320843001113",
    day: "06",
    month: "04",
    year: "1976",
    phone: "+79122340070"
  },
  url3: {
    url:
      "https://rmis.registratura96.ru/#!/group/department_34860/service/3712099/resource/26776943/planning/2019/02/!/",
    name: "igumnova",
    client: "shportak ilya",
    polis: "6696789748001959",
    day: "01",
    month: "03",
    year: "2012",
    phone: "+79126920811"
  },
  url4: {
    url:
      "https://rmis.registratura96.ru/#!/group/department_34860/service/3712098/resource/26627602/planning/2019/01/!/",
    name: "chalisheva",
    client: "Pavkina snegana",
    polis: "6696789777001649",
    day: "22",
    month: "03",
    year: "2012",
    phone: "+79506453309"
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
    pass: 
  }
});
let asyncPage = async (browser, data) => {
  const page = await browser.newPage();
  await page.goto(data.url);
  await page.setViewport({ width: 1920, height: 1080 });
  const insideLink = " div.container.wrapper > section > div:nth-child(2) > a";
  await page.waitForSelector(insideLink);
  await page.click(insideLink);
  await page.waitForSelector("#mobileOrEmail");
  await page.type("#mobileOrEmail", data.phone);
  await page.type("#password", data.pass);
  const insideLink2 =
    " #authnFrm > div.content-box.login-slils-box > div.data-form.flt-lbl-form > div.fields-grid.extra.has-ufopc > div.line-btns > button > span";
  await page.waitForSelector(insideLink2);
  await page.click(insideLink2);

  const chooseRegion = "#e-blank > div:nth-child(2) > div > mu-info > select";
  await page.waitForSelector(chooseRegion);
  await page.waitFor(200);
  page.select(chooseRegion, "bd694ef2-7bc9-4919-b517-a53b00f1f87b");
  await page.waitForSelector("#ApplicantBirthdate");
  await page.type("#ApplicantBirthdate", data.birthday);
  await page.type("#ApplicantBirthPlace", data.palceToBorn);
  page.select("#RelationType", "97aadf1d-09e4-4403-866f-a53b00f29b82");
  await page.type("#UnitCode", data.kodPodrazdeleinya);
  await page.type("#Children_LastName", data.Children_LastName);
  await page.type("#Children_FirstName", data.Children_FirstName);
  await page.type("#Children_MiddleName", data.Children_MiddleName);
  await page.type("#Children_BirthDate", data.Children_BirthDate);
  await page.type("#Children_BirthPlace", data.Children_BirthPlace);
  await page.type("#Children_Series", data.Children_Series);
  await page.type("#Children_Number", data.Children_Number);
  await page.type("#Children_Issued", data.Children_Issued);
  await page.type("#Children_DateIssue", data.Children_DateIssue);
  await page.type("#Children_ActEntry", data.Children_ActEntry);
  const NotificationByEmail = "#NotificationByEmail";
  await page.waitForSelector(NotificationByEmail);
  await page.click(NotificationByEmail);
  await page.waitFor(60000);
  ////#NotificationByEmail
  //********************************************************

  //await page.close();
};
let scrape = async data => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 30,
    ignoreHTTPSErrors: true
  });
  Promise.all([
    asyncPage(browser, data.url1)
    //asyncPage(browser, data.url2)
    //asyncPage(browser, data.url3),
    //asyncPage(browser, data.url4)
  ]).then(orderItems);
  await browser.close();
};
scrape(config).then(value => {});
