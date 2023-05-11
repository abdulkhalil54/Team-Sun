const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController')

router.route("/login")
    .get(loginController.loginPage)
    .post(loginController.loginUser)

module.exports = router
