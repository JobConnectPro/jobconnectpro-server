const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const achievementController = require('../controllers/achievementController.js');

router.get('/achievements', authentication, authorization(['Seeker']), achievementController.findAchievements);
router.get('/achievements/:achievementId', authentication, authorization(['Seeker']), achievementController.findAchievement);
router.post('/achievements', authentication, authorization(['Seeker']), achievementController.createAchievement);
router.put('/achievements/:achievementId', authentication, authorization(['Seeker']), achievementController.updateAchievement);
router.delete('/achievements/:achievementId', authentication, authorization(['Seeker']), achievementController.destroyAchievement);

module.exports = router;
