const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const workExperienceController = require('../controllers/workExperienceController.js');

router.get('/work-experiences', authentication, authorization(['Seeker']), workExperienceController.findWorkExperiences);
router.get('/work-experiences/:workExperienceId', authentication, authorization(['Seeker']), workExperienceController.findWorkExperience);
router.post('/work-experiences', authentication, authorization(['Seeker']), workExperienceController.createWorkExperience);
router.put('/work-experiences/:workExperienceId', authentication, authorization(['Seeker']), workExperienceController.updateWorkExperience);
router.delete('/work-experiences/:workExperienceId', authentication, authorization(['Seeker']), workExperienceController.destroyWorkExperience);

module.exports = router;
