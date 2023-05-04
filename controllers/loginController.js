const {db, pgp} = require('../database/dbConn')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const path = require("path")

//@desc Login page
//@route GET /login
//@access Public
const loginPage = asyncHandler(async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "login.html"));
})

//@desc Login user
//@route POST /login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const {username, password} =  req.body

    //Wait to retreive the correct password 
    let passwordExists = false;
    let hashedPassword = undefined
    let type = undefined
    await db.one('SELECT type, password FROM Users WHERE username = $1', username)
        .then((data) => {
            passwordExists = true;
            type = data.type;
            hashedPassword = data.password;
        })
        .catch((error) => {
            //No data error -> username not found
            if (error.code === pgp.errors.queryResultErrorCode.noData) {
                res.status(404).json({message: "ERROR: Username does not exist"});
            }
        })
    
    if (!passwordExists) {
        return res;
    }
    //Compares the password user provided and the encrypted correct password retrived from the database
    const match = await bcrypt.compare(password, hashedPassword);

    if(match){
        req.session.user = {username, type};
        if (type) {
            res.redirect("/portal/professor");
        } else {
            res.redirect("/portal/student");
        }
    } else {
        res.status(401).json({message: "ERROR: Wrong password"});
    }
    return res;
})


module.exports = {
    loginPage,
    loginUser,
}