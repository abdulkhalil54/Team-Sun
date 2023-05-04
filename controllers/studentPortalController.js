const asyncHandler = require('express-async-handler');
const path = require("path")

//@desc student portal
//@route GET /portal/student
//@access Public

const studentPageGet = asyncHandler(async (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "studentPortal.html"));
})

const studentPagePost = asyncHandler(async (req, res) => {
    return res.json({message: "Student Portal post"});
})

module.exports = {
    studentPageGet,
    studentPagePost,
}