import { launch } from "puppeteer"

await getRandomEmail()
export async function getRandomEmail() {
    // Start headless pupeteer browser on URL
    const URL = 'https://temp-mail.org/en/'
    const browser = await launch({headless: false})
    const page = await browser.pages()
    await page[0].goto(URL, {waitUntil: 'domcontentloaded'})
    
    // Search for random email on temp-mail.org website
    // await page[0].waitForRequest('https://web2.temp-mail.org/messages')
    await page[0].setRequestInterception(true)
    page[0].on('request', async req => {
        const URL = 'https://web2.temp-mail.org/messages'
        if (req.url() !== URL ) return req.abort()
        page[0].removeAllListeners()
        return req.continue()
    })
    const mail = await page[0].$eval('#mail', element => element.textContent)
    console.log(mail)
    // await browser.close()
    return mail
}