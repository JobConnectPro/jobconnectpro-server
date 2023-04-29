const express = require('express');
const router = express.Router();

const userRouter = require('./user.js');
const achievementRouter = require('./achievement.js');
const attainmentRouter = require('./attainment.js')
const educationRouter = require('./education.js')
const companyRouter = require('./company.js');
const sectorRouter = require('./sector.js');
const workExperienceRouter = require("./workExperience.js");
const organizationRouter = require("./organization.js");
const skillRouter = require('./skill.js');
const job = require('./job.js');
const category = require ('./category.js')
const projectRouter = require('./project.js');

router.use(userRouter);
router.use(workExperienceRouter);
router.use(attainmentRouter);
router.use(educationRouter);
router.use(achievementRouter);
router.use(companyRouter);
router.use(sectorRouter);
router.use(organizationRouter);
router.use(skillRouter);
router.use(projectRouter);
router.use(job);
router.use(category);

module.exports = router;
