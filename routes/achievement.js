const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController.js');

router.get('/achievements', achievementController.get);
router.get('/achievements/:id', achievementController.getById);
router.post('/achievements/', achievementController.create);

module.exports = router;
