const express = require("express");
const router = express.Router();
const { getSiteSettings, updateSiteSettings } = require("../controllers/siteSettingsController");
const { getSettings, updateSettings } = require("../models/siteSettingsModel");

// Get settings
router.get("/", getSiteSettings);
router.put("/", updateSiteSettings);
router.get("/", async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch settings" });
  }
});

// Update settings
router.put("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = new Settings();
    settings.theme = req.body.theme || settings.theme;
    settings.allowRegistration = req.body.allowRegistration ?? settings.allowRegistration;
    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Failed to update settings" });
  }
});

module.exports = router;
