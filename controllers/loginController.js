const {db, pgp} = require('../database/dbConn')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

//@desc Login user
//@route GET /login/:username/:password
//@access Public

const loginUser = asyncHandler(async (req, res) => {
    console.log(req.params)
    const {username, password} =  req.params

    //Wait to retreive the correct password 
    let hashedPassword = ""
    await db.one('SELECT password FROM Passwords WHERE username = $1', username)
        .then((data) => {
            hashedPassword = data.password
        })
        .catch((error) => {
            //No data error -> username not found
            if (error.code === pgp.errors.queryResultErrorCode.noData)
                console.log("ERROR: Username does not exist")
            res.status(403).json({message: "ERROR: Username does not exist"});
        })
    if (hashedPassword === ""){
        return res
    }
    //Compares the password user provided and the encrypted correct password retrived from the database
    const match = await bcrypt.compare(password, hashedPassword)
    if(match){
        res.status(200).json({message:"Successful login"});
    } else {
        res.status(200).json({message: "Wrong password"});
    }
})

//@desc Register user
//@route POST /register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {username, password} =  req.body
    //Hash the password, so that passwords cannot be stolen from the database
    const hashedPassword = await bcrypt.hash(password, 10)

    //try to insert the username and password
    await db.none('INSERT INTO Passwords(username, password) VALUES ($1, $2)', [username, hashedPassword])
        .then((data) => {
            console.log("Registered");
            return res.status(200).json({message: "registered"})
        })
        .catch((error) => {
            //Error code 23505: error: duplicate key value violates unique constraint
            //The uniqueness of username enforced on database
            if (error.code === '23505'){
                console.log("ERROR: Username already taken");
            }
            return res.status(403).json({message: "ERROR: Username already taken"})
        })
    
})

module.exports = {
    loginUser,
    registerUser
}