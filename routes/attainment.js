const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const attainmentController = require('../controllers/attainmentController.js');

router.get('/attainments', authentication, authorization(['Admin', 'Employer', 'Seeker']), attainmentController.findAttainments);
router.get('/attainments/:attainmentId', authentication, authorization(['Admin', 'Employer', 'Seeker']), attainmentController.findAttainment);
router.post('/attainments', authentication, authorization(['Admin']), attainmentController.createAttainment);
router.put('/attainments/:attainmentId', authentication, authorization(['Admin']), attainmentController.updateAttaiment);
router.delete('/attainments/:attainmentId', authentication, authorization(['Admin']), attainmentController.destroyAttainment);

module.exports = router;
