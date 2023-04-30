const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const categoryController = require('../controllers/categoryController.js');

router.get('/categories', authentication, authorization(['Admin', 'Employer', 'Seeker']), categoryController.findCategories);
router.get('/categories/:categoryId', authentication, authorization(['Admin', 'Employer', 'Seeker']), categoryController.findCategory);
router.get('/categories', authentication, authorization(['Admin', 'Employer', 'Seeker']), categoryController.searchCategories);
router.post('/categories', authentication, authorization(['Admin']), categoryController.createCategory);
router.put('/categories/:categoryId', authentication, authorization(['Admin']), categoryController.updateCategory);
router.delete('/categories/:categoryId', authentication, authorization(['Admin']), categoryController.destroyCategory);

module.exports = router;
