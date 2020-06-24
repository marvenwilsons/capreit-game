const express = require('express');
const router = express.Router()
const puppeteer = require('puppeteer');

router.post('/sc',(req,res) => {
    (async () => {
        const browswer = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
        })
        const page = await browswer.newPage()
        await page.goto('https://forms.office.com/Pages/ResponsePage.aspx?id=7ktcUTdBnEKsodR3O_zQP5333xr1QM1PgIMjtpRPpdZURUZGRjNKWDJXSEVTNTFCUlZKUzE1TkdKVC4u')
    
        await page.type("input[aria-labelledby='question1-title question1-questiontype']", `${req.body.player}`)
        await page.type("input[aria-labelledby='question3-title question3-questiontype']", `${req.body.office_location}`)
        await page.type("input[aria-labelledby='question4-title question4-questiontype']", `${req.body.score}`)
        await page.type("input[aria-labelledby='question5-title question5-questiontype']", `${req.body.playerdate}`)
        await page.type("input[aria-labelledby='question6-title question6-questiontype']", `${req.body.playertime}`)
        
        await page.click('.office-form-bottom-button')
        await page.screenshot({path: 'example.png'})
    
        await browswer.close()
    })()
})

router.get('/ct',(req,res) => {
    (async () => {
        const browswer = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
        })
        const page = await browswer.newPage()
        await page.goto('https://www.google.com/search?sxsrf=ALeKk02ui53WRPUpPrzitgiZXvEkjX9Drg%3A1592963352903&ei=GLHyXsHKNo-sytMP7a6c4Ak&q=toronto+time&oq=torotn&gs_lcp=CgZwc3ktYWIQAxgAMgcIIxCxAhAnMgcIIxCxAhAnMgcIIxCxAhAnMgQIABBDMgQIABBDMgQIABBDMgQIABBDMgQIABAKMgQIABAKMgQIABBDOgQIIxAnOgUIABCRAjoKCAAQgwEQFBCHAjoFCAAQgwE6BQgAELEDOgcIABCDARBDOgcIABCxAxBDOgIIAFCCEFjJFGDkHWgAcAB4AYABowKIAY0GkgEFNC4xLjGYAQCgAQGqAQdnd3Mtd2l6&sclient=psy-ab')
        const element = await page.$(".gsrt");
        const time = await page.evaluate(element => element.textContent, element);
        
        res.status(200).json({
            time
        })

        await browswer.close()
    })()
})




module.exports = {
    path: '/cap',
    handler: router
}