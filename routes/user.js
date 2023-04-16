const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authentication = require('../middlewares/authentication.js');
const resumeUpload = require('../middlewares/multerResume.js');
const profileUpload = require('../middlewares/multerProfile.js');

router.get('/users', authentication, userController.get);
router.get('/users/:id', authentication, userController.getById);
router.put('/users/:id', authentication, userController.update);
router.put(
  '/users/:id/profile',
  authentication,
  profileUpload.single('profile'),
  userController.uploadProfile
);
router.put(
  '/users/:id/resume',
  authentication,
  resumeUpload.single('resume'),
  userController.uploadResume
);

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
