const asyncHandler = require('express-async-handler');

//@desc student portal
//@route GET /portal/student
//@access Public

const studentPageGet = asyncHandler(async (req, res) => {
    return res.json({message: "Student Portal get"});
})

const studentPagePost = asyncHandler(async (req, res) => {
    return res.json({message: "Student Portal post"});
})

module.exports = {
    studentPageGet,
    studentPagePost,
}