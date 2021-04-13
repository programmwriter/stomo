/**
 * Created by Шпортак on 30.03.2018.
 */

//основной рабочи скрипт не изменять
const puppeteer = require('puppeteer');


//https://rmis.registratura96.ru/#!/group/department_34861/service/3712099/resource/26792920/planning/2018/04/!/

let config = {
    'url':'https://rmis.registratura96.ru/#!/group/department_34861/service/3712099/resource/26792920/planning/2018/04/!/',
    'polis':'6696689722001852',
    'day':'27',
    'month':'03',
    'year':'2013',
    'phone':'9089178522'
};
let count = 0;
let intervalID = setInterval(()=>{
    (async() => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(config.url);
        await page.setViewport({width: 1920, height: 1080});
        await page.waitFor(600);
        const result = await page.evaluate(() => {
            let data = [];
            let elements = document.querySelectorAll('a.day-link.animated-button');
            for (let element of elements){
                let count= element.children[2].innerText.charAt(0);
                data.push(count);
            }
            return data.filter((el)=>el>0).length;
        });
        browser.close();
        count ++;
        console.log(
            `Итерация №${count} количество талонов - ${result} //--${new Date}--//`);
        if(result){
            (async() => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(config.url);
                await page.waitFor(1000);
                await page.setViewport({width: 1920, height: 1080})
                const dayLink = 'a.day-link.animated-button';
                await page.waitForSelector(dayLink);
                await page.click(dayLink);
                await page.waitFor(500);
                const timeLink = 'a.time.animated-button';
                await page.waitForSelector(timeLink);
                await page.click(timeLink);
                await page.waitFor(1000);
                const agreeLink = 'div.btn-def-container:nth-child(14) > a:nth-child(1)';
                await page.waitForSelector(agreeLink);
                await page.click(agreeLink);
                await page.waitFor(500);
                await page.type('#authDocumentNumber', config.polis);
                await page.type('#birthDate', config.day);
                await page.type('#month', config.month);
                await page.type('#year', config.year);
                await page.click('#doAuth');
                const phoneInput = '#value';
                await page.waitForSelector(phoneInput);
                await page.type(phoneInput, config.phone);
                const agreePhoneLink = '#confirmValue';
                await page.waitForSelector(agreePhoneLink);
                await page.click(agreePhoneLink);
                await page.waitFor(500);
                /*const agreePhoneLink = '#chooseContact';
                const agreePhoneLink = '#skipContact';
                await page.waitForSelector(agreePhoneLink);
                await page.click(agreePhoneLink);
                await page.waitFor(500);*/
                await page.screenshot({path: 'examplee.png'});
                await browser.close();
            })();
            clearInterval(intervalID)
        }
    })();






}, 5000);



/*(async() => {
 const browser = await puppeteer.launch();
 const page = await browser.newPage();

 await page.goto('https://rmis.registratura96.ru/#!/group/department_34860/service/3712097/resource/26588806/planning/2018/04/!/');
 await page.setViewport({width: 1920, height: 1080});
 await page.waitFor(600);
 const result = await page.evaluate(() => {
 console.log(`url is ${location.href}`)
 let data = [];
 let elements = document.querySelectorAll('a.day-link.animated-button');
 for (let element of elements){
 let date = element.children[0].innerText;
 let time = element.children[1].innerText;
 let count= element.children[2].innerText.charAt(0);

 data.push(count);
 }
 console.log(data);
 return data.filter((el)=>el>0).length;
 });
 browser.close();
 console.log(result);
 })();*/