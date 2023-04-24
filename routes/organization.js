const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const OrganizationController = require('../controllers/organizationController.js');

router.get('/organizations', authentication, authorization(['Seeker']), OrganizationController.findOrganizations);
router.get('/organizations/:organizationId', authentication, authorization(['Seeker']), OrganizationController.findOrganization);
router.post('/organizations', authentication, authorization(['Seeker']), OrganizationController.createOrganization);
router.put('/organizations/:organizationId', authentication, authorization(['Seeker']), OrganizationController.updateOrganization);
router.delete('/organizations/:organizationId', authentication, authorization(['Seeker']), OrganizationController.destroyOrganization);

module.exports = router;
