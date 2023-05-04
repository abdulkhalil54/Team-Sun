const asyncHandler = require('express-async-handler');
const path = require("path")

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

const studentPagePost = asyncHandler(async (req, res) => {
    return res.json({message: "Student Portal post"});
})

module.exports = {
    studentPageGet,
    studentPagePost,
}