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

const getProfessorPortalSection = asyncHandler(async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "professorSection.html"));
});

const professorPortalSectionDynamic = asyncHandler(async (req, res) => {
    //find section by ID and populates with that information 
    const sectionID = req.params.id
    const username = req.session.user.username
  
    //if the section doesn't exist return error message 
    if (sectionID === undefined) {
      return res.status(404).json({ message: 'ERROR: non-existent section.' });
    }

    const applicationList = await db.many("SELECT name, status, username FROM applicationInfo");
    const profNames = await db.one("SELECT firstName, lastName FROM Users WHERE username = $1", username);
    
    // //formats student's information 
    // const formattedStudents = students.map((student) => {
    //   const { firstName, lastName, status, username } = student.student;
  
    //   return {
    //     //max length of 50 
    //     firstName: firstName.substring(0, 50),
    //     lastName: lastName.substring(0, 50),
    //     //status for each student 
    //     status: status === -1 || status === 0 || status === 1 ? status : null,
    //     username: username.substring(0, 50),
    //   };
    // });
    //returns section and student info 
    console.log(profNames);
    return res.status(200).json({
      section: sectionID,
      firstName: profNames.firstname,
      lastName: profNames.lastname,
      students: applicationList,
    });
  });

const getApplicationView = asyncHandler(async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "applicationView.html"));
});

const applicationViewDynamic = asyncHandler(async (req, res) => {
    const studentUsername = req.params.username

    let app = await db.one("SELECT username, name, year, grade, referenceName, referenceContact, attachment FROM applicationInfo WHERE username = $1", username);

    console.log(app);
    return res.status(200).json(app);
});

module.exports = {
    professorPageGet,
    apiProfessorPortal,
    getProfessorPortalSection,
    professorPortalSectionDynamic,
    getApplicationView,
    applicationViewDynamic,
}