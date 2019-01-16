const express = require('express');

const router = express.Router();

const checkAuth = require("../middleware/check-auth"); 
const projectController = require("../controllers/project");

router.get('/', checkAuth, projectController.getProject);

router.post('/', projectController.saveProject);

router.delete('/:projectID', projectController.deleteProject)

module.exports = router;