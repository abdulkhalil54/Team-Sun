const express = require('express')
const router = express.Router()
const path = require("path")

const applicationController = require('../controllers/applicationController')

router.route("/application")
    .get(applicationController.applicationPage)

module.exports = router