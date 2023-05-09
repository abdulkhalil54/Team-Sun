const express = require('express')
const router = express.Router()

const studentPortalController = require('../controllers/studentPortalController.js');

router.route("/portal/student")
    .get(studentPortalController.studentPageGet)
    .post(studentPortalController.studentPagePost)

router.get('/new-application', (req, res) => {
    // Redirect to the application form page
    res.redirect('/application');
});

module.exports = router