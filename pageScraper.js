const scraperObject = {
    url: 'http://google.com',
    async scraper(browser){
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        // await page.goto(`https://rmis.registratura96.ru/#!/group/department_34860/service/3712097/resource/26588806/planning/2021/06/!/`);
        // await page.goto(`https://rmis.registratura96.ru/#!/group/department_34860/service/3712099/resource/26776943/planning/2021/07/!/`);
        // await page.waitForSelector('.icon-mylk');
        // await page.waitForSelector('.day-link');
        // let urls = await page.$$eval('.day-link.animated-button', links => {
        //     return links.filter(link => link.querySelector('.day-desc:not([title = "Все занято"])')).map(el => el.href)
        // });
        // console.log(urls);
        const findOpenDay = async () => {
            let newPage = await browser.newPage();
            await newPage.goto(`https://rmis.registratura96.ru/#!/group/department_34860/service/3712097/resource/26588806/planning/2021/06/!/`);
            await newPage.waitForSelector("a.day-link");
            let result = [];
            while (!result.length) {
                await newPage.waitForSelector("a.day-link");
                // result = await newPage.$$(dayLink);
                result = await newPage.$$eval('.day-link.animated-button', links => {
                        return links.filter(link => link.querySelector('.day-desc:not([title = "Все занято"])')).map(el => el.href)
                    })
                console.log(result.length)
                await newPage.reload();
            }
            if (result.length) {
                await newPage.close();
                return result
            }
        }
        const daysList = await findOpenDay()
        await page.goto(daysList[0]);
        console.log(daysList)
    }
}

module.exports = scraperObject;