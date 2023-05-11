const express = require('express')
const router = express.Router()
const path = require("path")

const gotoapplicationController = require('../controllers/gotoapplicationController')

router.route("/gotoapplication")
    .get(gotoapplicationController.applicationPage)

module.exports = router