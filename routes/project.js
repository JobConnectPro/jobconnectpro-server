const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const ProjectController = require('../controllers/projectController.js');

router.get('/projects', authentication, authorization(['Seeker']), ProjectController.findProjects);
router.get('/projects/:projectId', authentication, authorization(['Seeker']), ProjectController.findProject);
router.post('/projects', authentication, authorization(['Seeker']), ProjectController.createProject);
router.put('/projects/:projectId', authentication, authorization(['Seeker']), ProjectController.updateProject);
router.delete('/projects/:projectId', authentication, authorization(['Seeker']), ProjectController.destroyProject);

module.exports = router;
