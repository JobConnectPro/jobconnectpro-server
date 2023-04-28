const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationController.js');
const authentication = require('../middlewares/authentication.js')

router.get('/education', authentication, educationController.getAllEducation);
router.get('/education/:id', authentication, educationController.getEducationById);
router.post('/education', authentication, educationController.createEducation);
router.put('/education/:id', authentication, educationController.updateEducationById);
router.delete('/education/:id', authentication, educationController.deleteEducationById);

module.exports = router;
