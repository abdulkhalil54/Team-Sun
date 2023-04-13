const db = require('../database/dbConn')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

//@desc Get all users
//@route GET /users
//@access Private

const loginUser = asyncHandler(async (req, res) => {
    console.log(req.params)
    const {username, password} =  req.params

    let hashedPassword = "0"
    await db.one('SELECT password FROM Passwords WHERE username = $1', username)
        .then((data) => {
            hashedPassword = data.password
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })

    const match = await bcrypt.compare(password, hashedPassword)
    if(match){
        res.status(200).json({message:"Successful"});
    } else {
        res.status(403).json({message: "U FAIL"});
    }
})

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {username, password} =  req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    //TODO
    //HANDLE DUPLICATE USERNAME

    await db.none('INSERT INTO Passwords(username, password) VALUES ($1, $2)', [username, hashedPassword])
        .then((data) => {
            console.log("Registered")
            return res.status(200)
        })
        .catch((error) => {
            console.log('ERROR:', error)
        })
    
    res.status(403)
})

module.exports = {
    loginUser,
    registerUser
}