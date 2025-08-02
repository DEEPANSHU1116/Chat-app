import express from 'express';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import User from '../models/user.model.js';
const router = express.Router();

const otpStore = {}; // Temporary OTP store (use database in production)


router.post("/check-email", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(200).json({ message: "Email is available" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  const otp = crypto.randomInt(100000, 999999);

  otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from:  process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Signup",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!otpStore[email]) {
    return res.status(400).json({ error: "OTP not found or expired" });
  }

  if (otpStore[email].otp === parseInt(otp)) {
    delete otpStore[email]; // Clear OTP after successful verification
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ error: "Invalid OTP" });
  }
});

export default router;
