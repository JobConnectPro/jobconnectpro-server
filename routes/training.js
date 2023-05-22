const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const trainingController = require('../controllers/trainingController.js');

router.get('/trainings', authentication, authorization(['Seeker']), trainingController.findTrainings);
router.get('/trainings/:trainingId', authentication, authorization(['Seeker']), trainingController.findTraining);
router.post('/trainings', authentication, authorization(['Seeker']), trainingController.createTraining);
router.put('/trainings/:trainingId', authentication, authorization(['Seeker']), trainingController.updateTraining);
router.delete('/trainings/:trainingId', authentication, authorization(['Seeker']), trainingController.destroyTraining);

module.exports = router;
