import { launch } from "puppeteer"

await getRandomEmail()
export async function getRandomEmail() {
    // Start headless pupeteer browser on URL
    const URL = 'https://temp-mail.org/en/'
    const browser = await launch({headless: false})
    const page = await browser.pages()
    await page[0].goto(URL)

    // Search for random email on temp-mail.org website
    const mail = await page[0].$eval('#mail', e => {
        let mail = setTimeout(e => e.innerText, 5000 )
        return mail
    }); await browser.close()
    
    console.log("mail: ", mail)
    return mail
}