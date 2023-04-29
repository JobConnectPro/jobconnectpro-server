const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const skillController = require('../controllers/skillController.js');

router.get('/skills', authentication, authorization(['Admin', 'Employer', 'Seeker']), skillController.findSkills);
router.get('/skills/:skillId', authentication, authorization(['Admin', 'Employer', 'Seeker']), skillController.findSkill);
router.post('/skills', authentication, authorization(['Admin']), skillController.createSkill);
router.put('/skills/:skillId', authentication, authorization(['Admin']), skillController.updateSkill);
router.delete('/skills/:skillId', authentication, authorization(['Admin']), skillController.destroySkill);

module.exports = router;
