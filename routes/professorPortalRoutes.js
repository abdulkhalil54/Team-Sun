const express = require('express');
const router = express.Router();

const professorPortalController = require('../controllers/professorPortalController.js');

router.route("/portal/professor")
    .get(professorPortalController.professorPageGet);

router.route("/api/portal/professor")
    .get(professorPortalController.apiProfessorPortal);

router.route("/portal/professor/section/:id")
    .get(professorPortalController.getProfessorPortalSection);

router.route("/api/portal/professor/section/:id")
    .get(professorPortalController.professorPortalSectionDynamic);

module.exports = router;