const express = require('express')
const router = express.Router()

const professorController = require('../controllers/professorController.js');

router.get('/section/:id', professorController.professorSectionGet);

module.exports = router
