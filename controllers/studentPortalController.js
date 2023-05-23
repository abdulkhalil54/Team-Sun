const asyncHandler = require('express-async-handler');
const path = require("path")
const {db, pgp} = require('../database/dbConn')

//@desc student portal
//@route GET /portal/student
//@access Public

const studentPageGet = asyncHandler(async (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, "..", "views", "studentPortal.html"));
    } else {
        res.redirect("/login");
    }
})

const studentPageDynamic = asyncHandler(async (req, res) => {
    const username = req.session.user.username;
    const studentRes = await db.one("SELECT firstName, lastName FROM Users WHERE username = $1", username)
    .catch((err)=>{
        console.log(err);
    })

    const applicationRes = await db.manyOrNone("SELECT preferences FROM applicationInfo WHERE username = $1", username)
    .catch((err)=>{
        console.log(err);
    })

    const sectionsRes = await db.manyOrNone("SELECT id, firstName, lastName, email FROM sectionsInfo")
    .catch((err)=>{
        console.log(err);
    })

    const matchingsRes = await db.manyOrNone("SELECT section as id, username FROM matchings WHERE username = $1", username)
    .catch((err)=>{
        console.log(err);
    })

    let prefArray = [];
    for(let i = 0; i < sectionsRes.length; i++){
        let status = -1;
        let preference = -1;
        if (applicationRes.length > 0){
            status = 2;
            console.log(applicationRes[0]);
            preference = applicationRes[0].preferences[i][1];
        }
        if (matchingsRes.length === 1) {
            if (sectionsRes[i].id === matchingsRes[0].id){
                status = 0;
            }
            else {
                status = 1;
            }
        }
        prefArray.push({
            "sectionID": sectionsRes[i].id,
            "professorfirstName": sectionsRes[i].firstname,
            "professorlastName": sectionsRes[i].lastname,
            "professorEmail": sectionsRes[i].email,
            "status": status,
            "preference": preference,
        })
    }

    return res.status(200).json({
        "firstName": studentRes.firstname,
        "lastName": studentRes.lastname,
        "preferences": prefArray
    })
})

module.exports = {
    studentPageGet,
    studentPageDynamic,
}