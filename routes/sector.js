const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const sectorController = require('../controllers/sectorController.js');

router.get('/sectors', authentication, authorization(['Admin', 'Employer', 'Seeker']), sectorController.findSectors);
router.get('/sectors/:sectorId', authentication, authorization(['Admin', 'Employer', 'Seeker']), sectorController.findSector);
router.post('/sectors', authentication, authorization(['Admin']), sectorController.createSector);
router.put('/sectors/:sectorId', authentication, authorization(['Admin']), sectorController.updateSector);
router.delete('/sectors/:sectorId', authentication, authorization(['Admin']), sectorController.destroySector);

module.exports = router;
