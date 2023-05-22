const express = require('express')
const router = express.Router()
const path = require("path")

const matchingController = require('./matchingController')

router.route("/api/match")
    .get(matchingController.getMatching)

module.exports = router