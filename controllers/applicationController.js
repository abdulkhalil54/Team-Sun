const {db, pgp} = require('../database/dbConn')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const path = require("path")

const applicationPage = asyncHandler(async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "applicationForm.html"));
})

module.exports = {
    applicationPage
}