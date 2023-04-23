const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController')

router.route("/api/v1/login/:username/:password")
    .get(loginController.loginUser)

module.exports = router
