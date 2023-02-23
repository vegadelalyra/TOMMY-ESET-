import { launch } from "puppeteer"

await getRandomEmail()
export async function getRandomEmail() {
    try {
        // Start headless pupeteer browser on URL
        const URL = 'https://temp-mail.org/en/'
        const browser = await launch({headless: false})
        const page = await browser.pages()
        await page[0].goto(URL)
        
        // Search for random email on temp-mail.org website
        // await page[0].waitForRequest('https://web2.temp-mail.org/messages')
        const mail = await page[0].$eval('#mail', element => element.textContent)
        console.log(mail)
        await browser.close()
        return mail
    } catch (err) { console.log(err) }
}