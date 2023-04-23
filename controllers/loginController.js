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
    await db.one('SELECT password FROM Users WHERE username = $1', username)
        .then((data) => {
            hashedPassword = data.password
        })
        .catch((error) => {
            //No data error -> username not found
            if (error.code === pgp.errors.queryResultErrorCode.noData)
                console.log("ERROR: Username does not exist")
            res.status(404).json({message: "ERROR: Username does not exist"});
        })
    if (hashedPassword === ""){
        return res
    }
    //Compares the password user provided and the encrypted correct password retrived from the database
    const match = await bcrypt.compare(password, hashedPassword)
    if(match){
        res.status(200).json({message:"SUCCESS: Successful login"});
    } else {
        res.status(401).json({message: "ERROR: Wrong password"});
    }
})


module.exports = {
    loginUser
}