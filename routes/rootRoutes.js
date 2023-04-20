const express = require('express')
const router = express.Router()
const path = require("path")

router.route('/').get(function(req, res, next) {
    res.sendFile(path.join(__dirname, "..", "views", "login.html"));
    //next();
});

module.exports = router