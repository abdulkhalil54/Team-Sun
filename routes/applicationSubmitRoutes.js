const express = require('express')
const router = express.Router()
const path = require("path")

const applicationSubmitController = require('../controllers/applicationSubmitController')

router.route('/api/application/submit')
    .post(applicationSubmitController.submitApplication)

module.exports = router