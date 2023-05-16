const { db, pgp } = require('../database/dbConn');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const path = require('path');

const redirectToProfessorPortal = asyncHandler(async (req, res) => {
  const { username } = req.params;
  res.status(302).redirect(`/application/view/${username}`);
});

module.exports = {
  redirectToProfessorPortal,
};
