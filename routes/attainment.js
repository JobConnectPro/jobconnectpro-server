const express = require('express');
const router = express.Router();
const attainmentController = require('../controllers/attainmentController.js');
const authentication = require('../middlewares/authentication.js')

router.get('/attainment',authentication, attainmentController.findAllAttainment);
router.get('/attainment/:id',authentication, attainmentController.findOneAttainment);
router.post('/attainment',authentication, attainmentController.createAttainment);
router.put('/attainment/:id',authentication, attainmentController.updateAttaiment);
router.delete('/attainment/:id',authentication, attainmentController.deleteAttainmentById);

module.exports = router;
