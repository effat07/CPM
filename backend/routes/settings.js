const express = require("express");
const router = express.Router();
const {
  getSiteSettings,
  updateSiteSettings,
} = require("../controllers/settingsController");

router.get("/theme", getSiteSettings);

router.put("/theme", updateSiteSettings);

module.exports = router;
