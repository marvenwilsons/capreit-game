const express = require('express');
const router = express.Router()
const puppeteer = require('puppeteer');

// console.log('cap.js')

router.post('/sc',(req,res) => {
    (async () => {
        const browswer = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
        })
        const page = await browswer.newPage()
        await page.goto('https://forms.office.com/Pages/ResponsePage.aspx?id=7ktcUTdBnEKsodR3O_zQP5333xr1QM1PgIMjtpRPpdZURUZGRjNKWDJXSEVTNTFCUlZKUzE1TkdKVC4u')
    
        await page.type("input[aria-labelledby='question1-title question1-questiontype']", `${req.body.player}`)
        await page.type("input[aria-labelledby='question2-title question2-questiontype']", `${req.body.office_location}`)
        await page.type("input[aria-labelledby='question3-title question3-questiontype']", `${req.body.score}`)
    
        await page.click('.office-form-bottom-button')
        await page.screenshot({path: 'example.png'})
    
        await browswer.close()
    })()
})




module.exports = {
    path: '/cap',
    handler: router
}