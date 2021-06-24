const isLogedIn = async (page) => {
    await page.waitForSelector("a.def-btn");
    return await page.$eval('a.icon-mylk', link => {
        console.log(link.classList)
        return link.classList.contains('authorized')
    })
}

module.exports = isLogedIn;