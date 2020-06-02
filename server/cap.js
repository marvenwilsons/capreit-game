const express = require('express');
const router = express.Router()
const puppeteer = require('puppeteer');

// console.log('cap.js')

router.post('/sc',(req,res) => {
    (async () => {
        const browswer = await puppeteer.launch()
        const page = await browswer.newPage()
        await page.goto('https://forms.office.com/Pages/ResponsePage.aspx?id=7ktcUTdBnEKsodR3O_zQP5333xr1QM1PgIMjtpRPpdZUN1lCQUVDV0ZDVTNUN1ZBTDVLWVZPMlRJWS4u')
    
        await page.type("input[placeholder='Enter your answer']", `${req.body.email}`)
        await page.type("input[placeholder='The value must be a number']", `${req.body.score}`)
    
        await page.click('.office-form-bottom-button')
        await page.screenshot({path: 'example.png'})
    
        await browswer.close()
    })()
})




module.exports = {
    path: '/cap',
    handler: router
}