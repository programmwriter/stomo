const login = require('./login');
const isLogedIn = require('./is-loged-in');
const findFreeDay = async (browser, url, config) => {
    let newPage = await browser.newPage();
    newPage = await login(newPage, config)
    await newPage.goto(url);
    const isLogged = await isLogedIn(newPage)
    console.log("-> isLogged", isLogged);
    if(!isLogged) {
        newPage = await login(newPage, config)
    }
    await newPage.waitForSelector("a.day-link");
    let count = 0;
    let result = [];
    while (!result.length) {
        count++;
        await newPage.waitForSelector("a.day-link");
        result = await newPage.$$eval('.day-link.animated-button', links => {
            return links.filter(link => link.querySelector('.day-desc:not([title = "Все занято"])')).map(el => el.href)
        })
        await newPage.reload();
        if (count === 99) {
            await newPage.close();
            result =  await findFreeDay(browser, url, config);
        }
    }
    if (result.length) {
        return [result, newPage]
    }
}

module.exports = findFreeDay;