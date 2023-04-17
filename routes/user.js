const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authentication = require('../middlewares/authentication.js');
const resumeUpload = require('../middlewares/multerResume.js');
const profileUpload = require('../middlewares/multerProfile.js');

router.get('/users', authentication, userController.findAllUser);
router.get('/users/profile', authentication, userController.findLoggedUser);
router.get(
  '/users/application',
  authentication,
  userController.findApplication
);
router.get('/users/:id', authentication, userController.findOneUser);
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
router.delete('/users/:id', authentication, userController.destroy);

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
