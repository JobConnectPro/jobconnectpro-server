const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authentication = require('../middlewares/authentication.js');
const resumeUpload = require('../middlewares/multerResume.js');
const photoUpload = require('../middlewares/multerPhoto.js');
const authorization = require('../middlewares/authorization.js');

// auth
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.put('/reset-password/:token', userController.resetPassword);

// user profile
router.get(
  '/users',
  authentication,
  authorization(['Admin']),
  userController.findUsers
);
router.get(
  '/users/profile',
  authentication,
  authorization(['Admin', 'Seeker', 'Employer']),
  userController.findUser
);
router.put(
  '/users/profile',
  authentication,
  authorization(['Admin', 'Seeker', 'Employer']),
  userController.updateUser
);
router.put(
  '/users/password',
  authentication,
  authorization(['Admin', 'Seeker', 'Employer']),
  userController.updatePassword
);
router.put(
  '/users/photo',
  authentication,
  authorization(['Admin', 'Seeker', 'Employer']),
  photoUpload.single('photo'),
  userController.uploadPhoto
);
router.put(
  '/users/resume',
  authentication,
  authorization(['Seeker']),
  resumeUpload.single('resume'),
  userController.uploadResume
);

// application
router.get(
  '/users/job-application',
  authentication,
  authorization(['Seeker']),
  userController.findApplications
);
router.post(
  '/users/job-application',
  authentication,
  authorization(['Seeker']),
  userController.createApplication
);
router.delete(
  '/users/job-application/:jobId',
  authentication,
  authorization(['Seeker']),
  userController.destroyApplication
);

// bookmark
router.get(
  '/users/job-bookmark',
  authentication,
  authorization(['Seeker']),
  userController.findBookmarks
);
router.post(
  '/users/job-bookmark',
  authentication,
  authorization(['Seeker']),
  userController.createBookmark
);
router.delete(
  '/users/job-bookmark/:jobId',
  authentication,
  authorization(['Seeker']),
  userController.destroyBookmark
);

// employer
router.get(
  '/users/employer',
  authentication,
  authorization(['Seeker']),
  userController.findEmployers
);
router.get(
  '/users/employer/:userId',
  authentication,
  authorization(['Seeker']),
  userController.findEmployerJobPosts
);

// user company
router.get(
  '/users/company',
  authentication,
  authorization(['Employer']),
  userController.findUserCompany
);

// job post
router.get(
  '/users/job-post',
  authentication,
  authorization(['Employer']),
  userController.findJobPosts
);
router.get(
  '/users/job-post/:jobId',
  authentication,
  authorization(['Employer']),
  userController.findJobPost
);
router.get(
  '/users/:userId/job/:jobId',
  authentication,
  authorization(['Employer']),
  userController.findApplicant
);
router.put(
  '/users/:userId/job/:jobId',
  authentication,
  authorization(['Employer']),
  userController.updateApplication
);

// user skill
router.post(
  '/users/skill',
  authentication,
  authorization(['Seeker']),
  userController.createSkill
);
router.delete(
  '/users/skill/:skillId',
  authentication,
  authorization(['Seeker']),
  userController.deleteSkill
);

module.exports = router;
