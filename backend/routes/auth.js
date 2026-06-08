const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
// Simple registration (no email verification for cloud)
router.post('/register-simple', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    const user = new User({
      name,
      email,
      password,
      role: 'user',
      isVerified: true
    });
    
    await user.save();
    res.status(201).json({ message: 'Registration successful! You can now login.' });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Store verification codes temporarily
const verificationCodes = new Map();

// ========== STEP 1: SEND VERIFICATION CODE ==========
router.post('/send-verification', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes.set(email, { code, expires: Date.now() + 10 * 60 * 1000 });
    
    await transporter.sendMail({
      to: email,
      subject: '🔐 Your Verification Code - PizzaHub',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h1 style="color: #ff4d4d; text-align: center;">PizzaHub 🍕</h1>
          <h2>Email Verification</h2>
          <p>Hi ${name || 'there'},</p>
          <p>Your verification code is:</p>
          <div style="font-size: 36px; font-weight: bold; text-align: center; padding: 20px; background-color: #f5f5f5; border-radius: 10px; letter-spacing: 5px;">
            ${code}
          </div>
          <p>This code expires in <strong>10 minutes</strong>.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `
    });
    
    res.json({ message: 'Verification code sent to your email!' });
    
  } catch (error) {
    console.error('Send verification error:', error);
    res.status(500).json({ message: 'Failed to send verification email' });
  }
});

// ========== STEP 2: VERIFY CODE ==========
router.post('/verify-code', async (req, res) => {
  try {
    const { email, code } = req.body;
    
    const stored = verificationCodes.get(email);
    
    if (!stored) {
      return res.status(400).json({ message: 'No verification code found. Request a new one.' });
    }
    
    if (stored.expires < Date.now()) {
      verificationCodes.delete(email);
      return res.status(400).json({ message: 'Code expired. Request a new one.' });
    }
    
    if (stored.code !== code) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }
    
    verificationCodes.set(email, { ...stored, verified: true });
    
    res.json({ message: 'Email verified successfully! Now set your password.' });
    
  } catch (error) {
    res.status(500).json({ message: 'Verification failed' });
  }
});

// ========== STEP 3: COMPLETE REGISTRATION ==========
router.post('/complete-registration', async (req, res) => {
  try {
    const { email, name, password } = req.body;
    
    const stored = verificationCodes.get(email);
    
    if (!stored || !stored.verified) {
      return res.status(400).json({ message: 'Email not verified. Please verify first.' });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    const user = new User({
      name,
      email,
      password,
      isVerified: true,
      role: 'user'
    });
    
    await user.save();
    verificationCodes.delete(email);
    
    res.status(201).json({ message: 'Registration successful! Please login.' });
    
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

// ========== LOGIN ==========
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email first' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'mysecretkey',
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

// ========== FORGOT PASSWORD ==========
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    
    await transporter.sendMail({
      to: email,
      subject: 'Reset Your Password - PizzaHub',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h1 style="color: #ff4d4d;">Reset Password 🔐</h1>
          <p>Hi ${user.name},</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #ff4d4d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;">Reset Password</a>
          </div>
          <p>This link expires in 1 hour.</p>
          <p>If you didn't request this, ignore this email.</p>
        </div>
      `
    });
    
    res.json({ message: 'Password reset email sent!' });
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to send reset email' });
  }
});

// ========== RESET PASSWORD ==========
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }
    
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    
    res.json({ message: 'Password reset successful! You can now login.' });
    
  } catch (error) {
    res.status(500).json({ message: 'Password reset failed' });
  }
});

// ========== VERIFY RESET TOKEN ==========
router.get('/verify-reset-token/:token', async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    
    res.json({ valid: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;