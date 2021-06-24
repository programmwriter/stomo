const findFreeTimeUrls = async (page, url) => {
    await page.goto(url);
    await page.waitForSelector(".time.animated-button");
    const timeLinks = await page.$$eval('.time.animated-button', links => links.map(el => el.href))
    await page.close();
    return timeLinks
}

module.exports = findFreeTimeUrls;