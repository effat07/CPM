const express = require("express");
const { findUserByEmail, savePasswordResetToken } = require("../models/userModel");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ message: "Email not found" });

  const resetToken = crypto.randomBytes(32).toString("hex");
  await savePasswordResetToken(email, resetToken);

  const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"My App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset Request",
    html: `<p>Click this link to reset your password:</p><a href="${resetLink}">${resetLink}</a><p>This link expires in 1 hour.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Reset link sent to your email!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = router;