const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController.js');
const authentication = require('../middlewares/authentication.js')
const logoUpload = require('../middlewares/multerLogo.js')


router.get(
    '/company',
    authentication,
    companyController.getAllCompany
)
router.get(
    '/company/:id',
    authentication,
    companyController.getCompanyById
)
router.post(
    '/company',
    authentication,
    logoUpload.single("logo"),
    companyController.createCompany
)
router.put(
    '/company/:id',
    authentication,
    companyController.updateCompanyById
)
router.put(
    '/company/:id/logo',
    authentication,
    logoUpload.single("logo"),
    companyController.updateCompanyLogo
)
router.delete(
    '/company/:id',
    authentication,
    companyController.deleteCompanyById
)

module.exports = router;
