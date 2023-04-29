const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const organizationController = require('../controllers/organizationController.js');

router.get('/organizations', authentication, authorization(['Seeker']), organizationController.findOrganizations);
router.get('/organizations/:organizationId', authentication, authorization(['Seeker']), organizationController.findOrganization);
router.post('/organizations', authentication, authorization(['Seeker']), organizationController.createOrganization);
router.put('/organizations/:organizationId', authentication, authorization(['Seeker']), organizationController.updateOrganization);
router.delete('/organizations/:organizationId', authentication, authorization(['Seeker']), organizationController.destroyOrganization);

module.exports = router;
