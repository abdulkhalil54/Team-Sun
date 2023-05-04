const {db, pgp} = require('../database/dbConn')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const path = require("path")

//@desc Registration page
//@route GET /register
//@access Public

const registerPage = asyncHandler(async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "registrationForm.html"));
})

//@desc Register user
//@route POST /register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {username, password, firstName, lastName, type} =  req.body
    //Hash the password, so that passwords cannot be stolen from the database
    const hashedPassword = await bcrypt.hash(password, 10) // 10 = salting

    //try to insert the username and password
    await db.none('INSERT INTO Users(username, password, type, firstName, lastName) VALUES ($1, $2, $3, $4, $5)', [username, hashedPassword, type, firstName, lastName])
        .then((data) => {
            console.log("SUCCESS: Successful registration");
            let newUser = {username, type}
            req.session.user = newUser
            if (type) {
                res.redirect("/portal/professor");
            } else {
                res.redirect("/portal/student");
            }
        })
        .catch((error) => {
            //Error code 23505: error: duplicate key value violates unique constraint
            //The uniqueness of username enforced on database
            if (error.code === '23505'){
                console.log("ERROR: Username already in use");
                res.status(409).json({message: "ERROR: Username already in use"});
            } else if (error.code === '22001') {
                console.log("ERROR: Too long or too short username and/or password");
                res.status(400).json({message: "ERROR: Too long or too short username and/or password"});
            } else {
                console.log("ERROR: Unexpected error. Error trace included below:")
                console.log(error)
            }
        })
    
})

module.exports = {
    registerPage,
    registerUser
}