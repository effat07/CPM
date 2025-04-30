const { getDB } = require("../config/db");

const getCategoryCollection = () => {
  const db = getDB();
  return db.collection("categories");
};

module.exports = { getCategoryCollection };
