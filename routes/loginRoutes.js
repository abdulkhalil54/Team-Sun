const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController')

router.route('/login/:username/:password')
    .get(loginController.loginUser)

router.route('/register')
    .post(loginController.registerUser)

module.exports = router
