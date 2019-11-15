const fsp = require('fs').promises
const fs = require('fs')
const path = require('path')
const Moment = require('moment')

const writeDataToFile = async ({ elements, teams }) => {
    try {
        const playersData = JSON.stringify(elements)
        const teamsData = JSON.stringify(teams)
        await fsp.writeFile('mocks/players.json', playersData)
        await fsp.writeFile('mocks/teams.json', teamsData)
        await fsp.writeFile('mocks/lastTimeCreated.txt', new Date())
    } catch (error) {
        // return new Promise.reject(error)
    }
}

const isRawDataUpdateLately = () => {

    try {
        // for future use
        const todayIsNotWeekend = Moment.weekdays(Moment().day()) !== 'sunday' || 'Friday' || 'Saturday'

        const filePath = path.join(__dirname, '..', 'mocks', 'lastTimeCreated.txt')
        const lastTimeCreatedString = fs.readFileSync(filePath, 'utf8')
        const todayDate = new Date().toDateString()
        const isCreatedToday = new Date(lastTimeCreatedString).toDateString() === todayDate
        return isCreatedToday
    } catch (error) {
        return false
    }
}

module.exports = { writeDataToFile, isRawDataUpdateLately }
