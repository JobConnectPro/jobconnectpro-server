const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController.js');

router.get('/skills', skillController.findAllSkill);
router.get('/skills/:id', skillController.findOneSkill);
router.post('/skills', skillController.createSkill);
router.put('/skills/:id', skillController.updateSkill);
router.delete('/skills/:id', skillController.destroySkill);

module.exports = router;
