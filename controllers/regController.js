const {db, pgp} = require('../database/dbConn')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

//@desc Register user
//@route POST /api/v1/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    const {username, password, type, firstName, lastName} =  req.body
    //Hash the password, so that passwords cannot be stolen from the database
    const hashedPassword = await bcrypt.hash(password, 10) // 10 = salting

    //try to insert the username and password
    await db.none('INSERT INTO Users(username, password, type, firstName, lastName) VALUES ($1, $2, $3, $4, $5)', [username, hashedPassword, type, firstName, lastName])
        .then((data) => {
            console.log("SUCCESS: Successful registration");
            return res.status(200).json({message: "SUCCESS: Successful registration"})
        })
        .catch((error) => {
            //Error code 23505: error: duplicate key value violates unique constraint
            //The uniqueness of username enforced on database
            if (error.code === '23505'){
                console.log("ERROR: Username already in use");
                return res.status(409).json({message: "ERROR: Username already in use"})
            }

            else if (error.code === '22001') {
                console.log("ERROR: Too long or too short username and/or password");
                return res.status(400).json({message: "ERROR: Too long or too short username and/or password"})
            }

            else {
                console.log(error)
            }
        })
    
})

module.exports = {
    registerUser
}