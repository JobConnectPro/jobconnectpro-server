const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');
const authentication = require('../middlewares/authentication.js')

router.get('/category', authentication, categoryController.getCategories);
router.post('/category', authentication, categoryController.createCategory);

module.exports = router;
