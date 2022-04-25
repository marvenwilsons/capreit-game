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
    
        await page.type("input[aria-labelledby='QuestionId_r9492df494bb04f83b543fafd4bd6aad9 QuestionInfo_r9492df494bb04f83b543fafd4bd6aad9']", `${req.body.player}`)
        await page.type("input[aria-labelledby='QuestionId_r267f1caf191a47b3893f61bfdc6f933b QuestionInfo_r267f1caf191a47b3893f61bfdc6f933b']", `${req.body.office_location}`)
        await page.type("input[aria-labelledby='QuestionId_r75e7f36439784dbc8afa425403f6e6e5 QuestionInfo_r75e7f36439784dbc8afa425403f6e6e5']", `${req.body.score}`)
        await page.type("input[aria-labelledby='QuestionId_r220c57a02e4141e0ab3e0fe25e81a469 QuestionInfo_r220c57a02e4141e0ab3e0fe25e81a469']", `${req.body.playerdate}`)
        await page.type("input[aria-labelledby='QuestionId_r3278c73ec29141dea091706d2299f18c QuestionInfo_r3278c73ec29141dea091706d2299f18c']", `${req.body.playertime}`)
        
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