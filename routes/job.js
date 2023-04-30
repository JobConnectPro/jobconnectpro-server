const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController.js');
const authentication = require('../middlewares/authentication.js');

router.get('/jobs', authentication, jobController.findJobs);
router.get('/jobs/:jobId', authentication, jobController.findJob);
router.post('/jobs', authentication, jobController.createJob);
router.put('/jobs/:jobId', authentication, jobController.updateJob);
router.delete('/jobs/:jobId', authentication, jobController.destroyJob);

module.exports = router;
