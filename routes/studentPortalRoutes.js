const express = require('express')
const router = express.Router()

const studentPortalController = require('../controllers/studentPortalController.js');

router.route("/portal/student")
    .get(studentPortalController.studentPageGet)

router.route("/api/portal/student")
    .get(studentPortalController.studentPageDynamic)

module.exports = router