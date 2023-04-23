const express = require("express");
const router = express.Router();
const userRouter = require("./user.js");
const workExperienceRouter = require("./workExperience.js");
const achievementRouter = require("./achievement.js");
const organizationRouter = require("./organization.js");

router.use(userRouter);
router.use(workExperienceRouter);
router.use(achievementRouter);
router.use(organizationRouter);

module.exports = router;
