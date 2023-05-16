const express = require('express');
const router = express.Router();
const profPortalViewsController = require('../controllers/profPortalViewsController');

router.get('/api/redirect/application/view/:username', profPortalViewsController.redirectToProfessorPortal);

module.exports = router;
