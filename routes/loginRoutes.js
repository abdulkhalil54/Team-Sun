const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController')

router.route('/login')
    .get(loginController.getAllSections)
    // .post(loginController.createNewUser)
    // .patch(loginController.updateUser)
    // .delete(loginController.deleteUser)

module.exports = router
