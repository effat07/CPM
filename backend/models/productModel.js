const { getDB } = require("../config/db");

const getProductCollection = () => {
  const db = getDB();
  return db.collection("products");
};

module.exports = { getProductCollection };
