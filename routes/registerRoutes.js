const express = require('express')
const router = express.Router()

const registerController = require('../controllers/registerController')

router.route('/register')
    .get(registerController.registerPage)
    .post(registerController.registerUser)

module.exports = router