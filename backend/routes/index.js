const express = require('express')
const router = express.Router()
const ndw = require('../scripts/ndw.js')

/* GET NDW Video of the day */
router.get('/videoOfTheDay', async function(req, res, next) {
  try {
    res.send(ndw.getVideoOfTheDay())
  } catch (err) {
    next(new Error("Oops - Something went wrong."))
  }
})

/* GET random Video */
router.get('/randomVideo', async function(req, res, next) {
  try {
    res.send(ndw.getRandomVideo())
  } catch (err) {
    next(new Error("Oops - Something went wrong."))
  }
})


module.exports = router
