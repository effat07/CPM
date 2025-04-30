// models/siteSettingsModel.js
const { getDB } = require("../config/db");

// Get the MongoDB collection
const getSiteSettingsCollection = () => getDB().collection("siteSettings");

// Fetch site settings
const getSettings = async () => {
  const settingsCollection = getSiteSettingsCollection();
  let siteSettings = await settingsCollection.findOne({});

  // Insert default settings if not existing
  if (!siteSettings) {
    siteSettings = {
      theme: "light",
      allowRegistration: true,
    };
    await settingsCollection.insertOne(siteSettings);
  }

  return siteSettings;
};

// Update site settings
const updateSettings = async (updateData) => {
  const settingsCollection = getSiteSettingsCollection();

  // Only allow updating theme and allowRegistration
  const allowedFields = ["theme", "allowRegistration"];
  const sanitizedData = {};

  for (const key of allowedFields) {
    if (updateData[key] !== undefined) {
      sanitizedData[key] = updateData[key];
    }
  }

  return await settingsCollection.updateOne(
    {},
    { $set: sanitizedData },
    { upsert: true }
  );
};

module.exports = {
  getSettings,
  updateSettings,
};
