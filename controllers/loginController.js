const db = require('../database/dbConn')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

//@desc Get all users
//@route GET /users
//@access Private
const getAllSections = asyncHandler(async (req, res) => {
    db.any('SELECT * FROM Sections')
        .then((data) => {
            return res.json({sections: data})
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
})

module.exports = {
    getAllSections,
}