const getTheTalon = async (browser, url, data) => {
    let page = await browser.newPage();
    try{
        await page.goto(url);
        await page.waitForSelector(".def-btn.animated-button");
        const newPageUrl = page.url().replace(/disclaimer/g, "contact");
        await page.goto(newPageUrl);
        // await page.waitForSelector("#authDocumentNumber");
        // await page.waitForTimeout(700);
        // await page.type("#authDocumentNumber", data.polis);
        // await page.type("#birthDate", data.day);
        // await page.type("#month", data.month);
        // await page.type("#year", data.year);
        // await page.click("#doAuth");
        const phoneInput = "#value";
        await page.waitForSelector("#value");
        await page.type(phoneInput, data.phone);
        const agreePhoneLink = "#confirmValue";
        await page.waitForSelector(agreePhoneLink);
        await page.waitForTimeout(300);
        // await page.click(agreePhoneLink);
        await page.waitForTimeout(300);
        await page.screenshot({path: `screenShot${Math.random()}.png`});
        const quitLk = "#header-btn-mylk-exit";
        await page.waitForSelector(quitLk);
        await page.click(quitLk);
        await page.close();
    }catch (e) {
        console.log(`
                ************************()**************************
                Произошла ошибка во время взятия талона
                ************************()**************************
                `);
         console.log(e);
         await page.close();
    }
}

module.exports = getTheTalon;