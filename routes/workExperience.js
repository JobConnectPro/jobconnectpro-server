const express = require("express");
const router = express.Router();
const WorkExperienceController = require("../controllers/workExperienceController.js");

router.get("/work_experience", WorkExperienceController.findAll);
router.get("/work_experience/:id", WorkExperienceController.findOne);
router.post("/work_experience", WorkExperienceController.create);
router.put("/work_experience/:id", WorkExperienceController.update);
router.delete("/work_experience/:id", WorkExperienceController.destroy);

module.exports = router;
