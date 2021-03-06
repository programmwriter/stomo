const findFreeDay = require('./functions/find-free-day');
const findFreeTimeUrls = require('./functions/find-free-time-urls');
const getTheTalon = require('./functions/get-the-talon');
const login = require('./functions/login');
const isLogedIn = require('./functions/is-loged-in');



const scraperObject = {
    url: "https://rmis.registratura96.ru/#!/group/department_34860/service/3712099/resource/26776943/planning/2021/07/!/",
    async scraper(browser, config){
        try{
            const [dayLinks, openedPage] = await findFreeDay(browser, config)
            const timeLinks = await findFreeTimeUrls(openedPage, dayLinks[0])
            timeLinks.map(link => getTheTalon(browser, link, config))
            await Promise.all(timeLinks)
        }catch (e) {
            console.log(`
                ************************()**************************
                Произошла ошибка в скрипте , скрипт будет перезапущен
                ************************()**************************
                `);
            console.log(e);
            await this.scraper(browser, config);
        }
    }
}

module.exports = scraperObject;