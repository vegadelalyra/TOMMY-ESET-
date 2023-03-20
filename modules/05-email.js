import { launch } from "puppeteer"
import { spawnSync } from 'child_process'

await getRandomEmail()
export async function getRandomEmail() {
    // Start headless pupeteer browser on URL
    const URL = 'https://temp-mail.org/en/'
    const browser = await launch({ headless: false, timeout: 0 })
    const page = await browser.pages()
    
    // Runs puppeteer browser minimized
    // const session = await page[0].target().createCDPSession()
    // const {windowId} = await session.send('Browser.getWindowForTarget')
    // await session.send('Browser.setWindowBounds', 
    // {windowId, bounds: {windowState: 'minimized'}})
    await page[0].goto(URL, {waitUntil: 'domcontentloaded'})

    // Search for random email on temp-mail.org website
    page[0].setRequestInterception(true)
    page[0].on('request', req => {
        if (req.url != 'https://web2.temp-mail.org/messages') req.abort()
        else req.continue()
    })
    await page[0].waitForRequest('https://web2.temp-mail.org/messages')
    await page[0].click("#click-to-copy", {delay: 1000})
    await browser.close()

    // Email copied, afterwards, extract it from clipboard and console log it
    const mail = spawnSync(
        'powershell.exe Get-Clipboard -Raw', 
        { shell: true }
    ).stdout.toString().trim()
    console.log(mail); return mail 
} 