const express = require('express');
const router = express.Router();
const userRouter = require('./user.js');
const achievementRouter = require('./achievement.js');
const companyRouter = require('./company.js');
const sectorRouter = require('./sector.js');

router.use(userRouter);
router.use(achievementRouter);
router.use(companyRouter);
router.use(sectorRouter);

module.exports = router;
