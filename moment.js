const moment = require('moment-timezone');
const oldMoment = require('moment')

const time = moment.tz(oldMoment(), "America/Phoenix").format('LT')
const currentDate = oldMoment().format("MMM Do YY")

const getDate = function () {
    return currentDate
}

const getTime = function () {
    return time
}

export default {
    getDate,
    getTime
}
