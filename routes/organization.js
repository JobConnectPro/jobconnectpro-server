const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication.js");
const OrganizationController = require("../controllers/organizationController.js");

router.get(
  "/organization",
  authentication,
  OrganizationController.findOrganization
);
router.post(
  "/organization",
  authentication,
  OrganizationController.createOrganization
);
router.put("/organization/:id", authentication, OrganizationController.update);
router.delete(
  "/organization/:id",
  authentication,
  OrganizationController.destroy
);
module.exports = router;
