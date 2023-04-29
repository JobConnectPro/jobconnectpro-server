const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const educationController = require('../controllers/educationsController.js');

router.get('/educations', authentication, authorization(['Seeker']), educationController.findEducations);
router.get('/educations/:educationId', authentication, authorization(['Seeker']), educationController.findEducation);
router.post('/educations', authentication, authorization(['Seeker']), educationController.createEducation);
router.put('/educations/:educationId', authentication, authorization(['Seeker']), educationController.updateEducation);
router.delete('/educations/:educationId', authentication, authorization(['Seeker']), educationController.destroyEducation);

module.exports = router;
