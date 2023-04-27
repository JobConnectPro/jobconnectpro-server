const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController.js');
const authentication = require('../middlewares/authentication.js');

router.get('/jobs', authentication, jobController.findAllJobs);
router.get('/jobs/:id', authentication, jobController.getJobById);
router.post('/jobs', authentication, jobController.createJobs);
router.put('/jobs/:id', authentication, jobController.updateJob);
router.delete('/jobs/:id', authentication, jobController.deleteJob)



module.exports = router;
