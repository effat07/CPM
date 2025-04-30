const express = require("express");
const router = express.Router();
const verifyRole = require("../middlewares/roleMiddleware");


router.get("/admin/dashboard", verifyRole(["Admin"]), (req, res) => {
  res.send("Admin Dashboard");
});

router.get(
  "/manager/products",
  verifyRole(["Admin", "Manager"]),
  (req, res) => {
    res.send("Manager Product Page");
  }
);

module.exports = router;
