const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authentication = require('../middlewares/authentication.js');
const resumeUpload = require('../middlewares/multerResume.js');
const photoUpload = require('../middlewares/multerPhoto.js');

// auth
router.post('/register', userController.register);
router.post('/login', userController.login);

// user profile
router.get('/users', authentication, userController.getUsers);
router.get('/users/profile', authentication, userController.getLoggedUser);
router.put('/users/profile', authentication, userController.updateLoggedUser);
router.put('/users/password', authentication, userController.updatePassword);
router.put('/users/photo', authentication, photoUpload.single('photo'), userController.uploadPhoto);
router.put('/users/resume', authentication, resumeUpload.single('resume'), userController.uploadResume);

// application
router.get('/users/job-application', authentication, userController.getApplication);
router.post('/users/job-application', authentication, userController.createApplication);
router.delete('/users/job-application/:jobId', authentication, userController.deleteApplication);

// bookmark
router.get('/users/job-bookmark', authentication, userController.getBookmark);
router.post('/users/job-bookmark', authentication, userController.createBookmark);
router.delete('/users/job-bookmark/:jobId', authentication, userController.deleteBookmark);

// job post
router.get('/users/job-post', authentication, userController.getJobPost);

// user skill
router.post('/users/skill', authentication, userController.createSkill);
router.delete('/users/skill/:skillId', authentication, userController.deleteSkill);

module.exports = router;
