const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');
const jobController = require('../controllers/jobController.js');

router.get('/jobs', authentication, authorization(['Admin', 'Employer', 'Seeker']), jobController.findJobs);
router.get('/jobs/:jobId', authentication, authorization(['Admin', 'Employer', 'Seeker']), jobController.findJob);
router.post('/jobs', authentication, authorization(['Employer']), jobController.createJob);
router.put('/jobs/:jobId', authentication, authorization(['Employer']), jobController.updateJob);
router.delete('/jobs/:jobId', authentication, authorization(['Employer']), jobController.destroyJob);

module.exports = router;
