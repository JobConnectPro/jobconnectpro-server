const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const companyController = require('../controllers/companyController.js');
const logoUpload = require('../middlewares/multerLogo.js');

router.get('/companies', authentication, authorization(['Admin', 'Employer', 'Seeker']), companyController.findCompanies);
router.get('/companies/:companyId', authentication, authorization(['Admin', 'Employer', 'Seeker']), companyController.findCompany);
router.get('/companies/user/:id', authentication, authorization(['Admin', 'Employer', 'Seeker']),companyController.findCompanyUserId);
router.post('/companies', authentication, authorization(['Employer']), logoUpload.single('logo'), companyController.createCompany);
router.put('/companies/:companyId', authentication, authorization(['Employer']), companyController.updateCompany);
router.put('/companies/:companyId/logo', authentication, authorization(['Employer']), logoUpload.single('logo'), companyController.updateCompanyLogo);
router.delete('/companies/:companyId', authentication, authorization(['Employer']), companyController.destroyCompany);

module.exports = router;
