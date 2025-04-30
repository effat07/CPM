// controllers/siteSettingsController.js
const { getSettings, updateSettings } = require("../models/siteSettingsModel");


// Get current site settings
exports.getSiteSettings = async (req, res) => {
  try {
    const settings = await getSettings();
    res.status(200).json(settings);
  } catch (error) {
    console.error("Error fetching site settings", error);
    res.status(500).json({ message: "Error fetching site settings", error });
  }
};

// Update site settings
exports.updateSiteSettings = async (req, res) => {
  try {
    const updateData = req.body;

    if (!updateData.theme && updateData.allowRegistration === undefined) {
      return res.status(400).json({ message: "Invalid update payload" });
    }

    await updateSettings(updateData);

    const updatedSettings = await getSettings();
    res.status(200).json({
      message: "Site settings updated successfully",
      settings: updatedSettings,
    });
  } catch (error) {
    console.error("Error updating site settings", error);
    res.status(500).json({ message: "Error updating site settings", error });
  }
};
