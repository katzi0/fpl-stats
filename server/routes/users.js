var express = require('express')
const axios = require('axios')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource')
})


router.get('/test', (req, res) => {
  axios.get('https://draft.premierleague.com/api/my-team/1839880/').then(({data}) => res.send(data))
})

module.exports = router
