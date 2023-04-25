const express = require('express');
const router = express.Router();
const userRouter = require('./user.js');
const jobRouter = require('./job.js')
const categoryRouter = require('./category.js')
const achievementRouter = require('./achievement.js');

router.use(userRouter);
router.use(jobRouter);
router.use(categoryRouter);
router.use(achievementRouter);

module.exports = router;
