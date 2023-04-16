const express = require('express');
const router = express.Router();
const userRouter = require('./user.js');
const achievementRouter = require('./achievement.js');

router.use(userRouter);
router.use(achievementRouter);

module.exports = router;
