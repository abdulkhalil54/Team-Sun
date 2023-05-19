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
//@route GET /api/portal/professor
//@access Public
//endpoint 42
const apiProfessorPortal = asyncHandler(async (req, res) => {
    console.log(req.session.user);
    if(req.session.user) {
        if(req.session.user.type) {
            //Wait to retreive the correct password 
            let username = req.session.user.username;
            try{
                const name = await db.one('SELECT firstName, lastName FROM Users WHERE username = $1', username);
                const sectionInfo = await db.any('SELECT id, count(*) as app_count FROM Sections WHERE username = $1 GROUP BY id', username);
                console.log(name);
                const sectionInfoArray = sectionInfo.map(section => {
                    return {
                        id: section.id,
                        numEnrolled: section.app_count
                    };
                });
                res.json({firstName: name.firstname, lastName: name.lastname, applications: sectionInfoArray});
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

const redirectProfessorPortalSection = asyncHandler(async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "professorSection.html"));
});

module.exports = {
    professorPageGet,
    apiProfessorPortal,
    redirectProfessorPortalSection
}