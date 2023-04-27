const express = require('express')
const router = express.Router()

const studentPortalController = require('../controllers/studentPortalController.js');

router.route("/portal/student")
    .get(studentPortalController.studentPageGet)
    .post(studentPortalController.studentPagePost)

module.exports = router