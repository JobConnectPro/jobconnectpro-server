const express = require('express');
const router = express.Router();
const sectorController = require('../controllers/sectorController.js');
const authentication = require('../middlewares/authentication.js');

router.get(
    '/sector',
    authentication,
    sectorController.getAllSector
)
router.get(
    '/sector/:id',
    authentication,
    sectorController.getSectorById
)
router.post(
    '/sector',
    authentication,
    sectorController.createSector
)
router.put(
    '/sector/:id',
    authentication,
    sectorController.updateSectorById
)
router.delete(
    '/sector/:id',
    authentication,
    sectorController.deleteSectorById
)

module.exports = router;
