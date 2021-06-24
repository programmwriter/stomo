const findFreeDay = require('./functions/find-free-day');
const findFreeTimeUrls = require('./functions/find-free-time-urls');
const getTheTalon = require('./functions/get-the-talon');
const login = require('./functions/login');
const isLogedIn = require('./functions/is-loged-in');


const config = require("./config");
const scraperObject = {
    url: "https://rmis.registratura96.ru/#!/group/department_34860/service/3712099/resource/26776943/planning/2021/07/!/",
    async scraper(browser){
        try{
            const [dayLinks, openedPage] = await findFreeDay(browser, this.url, config.url1)
            const timeLinks = await findFreeTimeUrls(openedPage, dayLinks[0])
            timeLinks.map(link => getTheTalon(browser, link, config.url1))
            await Promise.all(timeLinks)
        }catch (e) {
            console.log(`
                ************************()**************************
                Произошла ошибка в скрипте , скрипт будет перезапущен
                ************************()**************************
                `);
            console.log(e);
            await this.scraper(browser);
        }
    }
}

module.exports = scraperObject;