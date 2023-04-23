const express = require('express');
const router = express.Router();
const userRouter = require('./user.js');
const achievementRouter = require('./achievement.js');
const skillRouter = require('./skill.js');

router.use(userRouter);
router.use(achievementRouter);
router.use(skillRouter);

module.exports = router;
