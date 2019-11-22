const express = require('express')
const axios = require('axios')
const router = express.Router()
const _ = require('lodash')
const BASE_URL = 'https://fantasy.premierleague.com/api'
const IMAGES_URL = 'https://platform-static-files.s3.amazonaws.com/premierleague/photos/players/110x140/'
const { writeDataToFile, isRawDataUpdateLately } = require('../utils/utils')
const rawData = require('../mocks/raw-data.js')
const players = require('../mocks/players')
const teams = require('../mocks/teams')
const fs = require('fs')
const path = require('path')
const Moment = require('moment')

router.get('/inital-data', async (req, res) => {
    const localDataUpdated = isRawDataUpdateLately()
    // if (localDataUpdated) {
    //     res.send({ players, teams })
    //     return
    // }
    try {
        const { data } = await axios.get(`${BASE_URL}/bootstrap-static/`, { timeout: 13000 })
        const { elements, teams } = data
        const players = elements.map(player => {
            const fileName = `p${player.photo.substr(0, player.photo.length - 4)}.png`
            const photoUrl = `${IMAGES_URL}${fileName}`
            return { ...player, photoUrl }
        })
        await writeDataToFile(data)
        res.send({
            players, teams,
        })
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            res.send({ players, teams })
        } else {
            res.send(error)
        }
    }
})

router.get('/data-collections', (req, res) => {
    res.send({ players, teams })
})

router.get('/player/:id', async (req, res) => {
    let selectedPlayer = players.find(player => player.id === parseInt(req.params.id))
    const fileName = `p${selectedPlayer.photo.substr(0, selectedPlayer.photo.length - 4)}.png`
    // const photo = await axios.get(`${IMAGES_URL}${fileName}`)
    res.send({ ...selectedPlayer, photoUrl: `${IMAGES_URL}${fileName}` })
})

router.get('/login', async (req, res) => {

    const postResponse = await axios.post('https://users.premierleague.com/accounts/login/', {
        'password': 'WakaWaka422',
        'login': 'katzi0@gmail.com',
        'redirect_uri': 'https://fantasy.premierleague.com/a/login',
        // 'csrftoken': 'of08BcC5PyBrvF1h019ottM8Cc0ygMG9td5T4xhe2uViOQ7grvzDXy9a9y3F1dOA',
        // 'app': 'plfpl-web',
    })

    const loginRespone = await axios.post('https://fantasy.premierleague.com/a/login', {
        'password': 'WakaWaka422',
        'login': 'katzi0@gmail.com',
        // 'redirect_uri': 'https://fantasy.premierleague.com/a/login',
        // 'csrftoken': 'of08BcC5PyBrvF1h019ottM8Cc0ygMG9td5T4xhe2uViOQ7grvzDXy9a9y3F1dOA',
        // 'app': 'plfpl-web',
    })
    const postCookies = _.get(postResponse, 'headers.set-cookie')
    const logCookies = _.get(postResponse, 'headers.set-cookie')
    console.log(postCookies)
})

module.exports = router
