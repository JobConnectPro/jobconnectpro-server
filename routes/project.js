const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const projectController = require('../controllers/projectController.js');

router.get('/projects', authentication, authorization(['Seeker']), projectController.findProjects);
router.get('/projects/:projectId', authentication, authorization(['Seeker']), projectController.findProject);
router.post('/projects', authentication, authorization(['Seeker']), projectController.createProject);
router.put('/projects/:projectId', authentication, authorization(['Seeker']), projectController.updateProject);
router.delete('/projects/:projectId', authentication, authorization(['Seeker']), projectController.destroyProject);

module.exports = router;
