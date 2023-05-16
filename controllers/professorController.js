const {db, pgp} = require('../database/dbConn')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const path = require("path")

//const Section = require('..//.js');


//GET requests for professor section 
const professorSectionGet = asyncHandler(async (req, res) => {
    //find section by ID and populates with that information 
    const section = await Section.findById(req.params.id).populate('students.student');
  
    //if the section doesn't exist return error message 
    if (!section) {
      return res.status(404).json({ message: 'ERROR: non-existent section.' });
    }
  
    const { sectionNumber, professorFirstName, professorLastName, students } = section;
    
    //formats student's information 
    const formattedStudents = students.map((student) => {
      const { firstName, lastName, status, username } = student.student;
  
      return {
        //max length of 50 
        firstName: firstName.substring(0, 50),
        lastName: lastName.substring(0, 50),
        //status for each student 
        status: status === -1 || status === 0 || status === 1 ? status : null,
        username: username.substring(0, 50),
      };
    });
    //returns section and student info 
    return res.status(200).json({
      section: sectionNumber,
      firstName: professorFirstName.substring(0, 50),
      lastName: professorLastName.substring(0, 50),
      students: formattedStudents,
    });
  });
  
  module.exports = {
    professorSectionGet,
  };