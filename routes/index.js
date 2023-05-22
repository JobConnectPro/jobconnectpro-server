const express = require('express');
const router = express.Router();

const userRouter = require('./user.js');
const skillRouter = require('./skill.js');
const projectRouter = require('./project.js');
const trainingRouter = require('./training.js');
const educationRouter = require('./education.js');
const attainmentRouter = require('./attainment.js');
const achievementRouter = require('./achievement.js');
const organizationRouter = require('./organization.js');
const workExperienceRouter = require('./workExperience.js');

const sectorRouter = require('./sector.js');
const companyRouter = require('./company.js');

const jobRouter = require('./job.js');
const categoryRouter = require('./category.js');

router.use(userRouter);
router.use(skillRouter);
router.use(projectRouter);
router.use(trainingRouter);
router.use(educationRouter);
router.use(attainmentRouter);
router.use(achievementRouter);
router.use(organizationRouter);
router.use(workExperienceRouter);

router.use(sectorRouter);
router.use(companyRouter);

router.use(jobRouter);
router.use(categoryRouter);

module.exports = router;
