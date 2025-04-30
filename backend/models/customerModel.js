const { getDB } = require("../config/db");

const getCustomerCollection = () => {
  const db = getDB();
  return db.collection("customers");
};

module.exports = { getCustomerCollection };
