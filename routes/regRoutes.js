const express = require('express')
const router = express.Router()

const regController = require('../controllers/regController')

router.route('/api/v1/register')
    .post(regController.registerUser)

module.exports = router