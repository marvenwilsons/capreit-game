const express = require('express');
const router = express.Router()

const GoogleSpreadsheet = require('google-spreadsheet')
const { promisify } = require('util')
const creds = require('./2c23acddf418.json')

async function accessSpreadsheet() {
    const doc = new GoogleSpreadsheet.GoogleSpreadsheet('1qwMnliCG1vSuwg7dcBizb9GYfvWW7w45ffwbDf5')
    // await promisify(doc.useServiceAccountAuth)(creds)

    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
    })
    
    const info = await promisify(doc.getInfo)()

    const sheet = info.worksheets[0]
    console.log(`Title: ${sheet.title}, Rows: ${sheet.rowCount}`)
}

accessSpreadsheet()

router.get('/players', (req,res) => {

})



module.exports = {
    path: '/spreadsheet',
    handler: router
}