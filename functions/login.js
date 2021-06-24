const login = async (page, data) => {
    if(page.url()=== 'about:blank') return page;
    await page.goto('https://rmis.registratura96.ru/#!/office/!/');
    const authDocumentLink = "#authDocumentNumber";
    await page.waitForSelector(authDocumentLink);
    await page.waitForTimeout(4700);
    await page.type(authDocumentLink, data.polis);
    await page.type("#birthDate", data.day);
    await page.type("#month", data.month);
    await page.type("#year", data.year);
    await page.click("#doAuth");
    await page.goto(data.url);
    return page
}

module.exports = login;