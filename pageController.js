const pageScraper = require('./pageScraper');
const config = require("./config");
async function scrapeAll(browserInstance){
    let browser;
    try{
        browser = await browserInstance;
        await Promise.all([pageScraper.scraper(browser, config.url1), pageScraper.scraper(browser, config.url2), pageScraper.scraper(browser, config.url3)])
        // await pageScraper.scraper(browser, config.url1);
        // await pageScraper.scraper(browser, config.url2);
        // await pageScraper.scraper(browser, config.url3);

    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)