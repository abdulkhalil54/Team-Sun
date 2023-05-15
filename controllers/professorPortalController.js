const asyncHandler = require('express-async-handler');
const {db, pgp} = require('../database/dbConn')
const path = require("path");

//@desc professor portal
//@route GET /portal/professor
//@access Public
//endpoint 41
const professorPageGet = asyncHandler(async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "professorPortal.html"));
})

//@desc professor portal
//@route GET api/portal/professor
//@access Public
//endpoint 42
const apiProfessorPortal = asyncHandler(async (req, res) => {
    if(req.session.user) {
        if(req.session.user.type) {
            //Wait to retreive the correct password 
            let username = req.session.user.username;
            try{
                const firstName = await db.one('SELECT firstName FROM Users WHERE username = $1', username);
                const lastName = await db.one('SELECT lastName FROM Users WHERE username = $1', username);
                const sections = await db.any('SELECT DISTINCT id, numEnrolled FROM SECTIONS WHERE username = $1', username);
                const sectionsArray = sections.map(section => {
                    return {
                        id: section.id,
                        numEnrolled: section.numEnrolled
                    };
                });
                res.json({firstName: firstName.firstname, lastName: lastName.lastname, sections: sectionsArray});
            }catch(err){
                console.log(err);
            }
        } else {
            res.redirect("/portal/student");
        }
    } else {
        res.redirect("/login");
    }
});

module.exports = {
    professorPageGet,
    apiProfessorPortal
}