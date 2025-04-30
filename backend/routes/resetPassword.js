
const express = require("express");
const bcrypt = require("bcryptjs");
const { findUserByResetToken, updatePassword } = require("../models/userModel");
const router = express.Router();


router.post("/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

 
  const user = await findUserByResetToken(token);
  if (!user) {
    return res.status(400).json({ message: "Invalid or expired reset token" });
  }

  
  const currentTime = Date.now();
  if (currentTime > user.resetTokenExpiry) {
    return res.status(400).json({ message: "Reset token has expired" });
  }

  
  const hashedPassword = await bcrypt.hash(password, 10);

  
  await updatePassword(user.email, hashedPassword);

  return res
    .status(200)
    .json({ message: "Password has been reset successfully" });
});

module.exports = router;
