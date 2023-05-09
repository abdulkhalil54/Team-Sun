const {db, pgp} = require('../database/dbConn')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const path = require("path")

const gotoapplicationPage = asyncHandler(async (req, res) => {
    res.redirect('/application');
})

module.exports = {
    gotoapplicationPage
}