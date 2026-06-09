const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Email transporter (update with your credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'test@gmail.com',
    pass: process.env.EMAIL_PASS || 'test123'
  }
});

// Store verification codes
const verificationCodes = new Map();

// ========== SEND VERIFICATION CODE ==========
router.post('/send-verification', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    if (!email) return res.status(400).json({ message: 'Email is required' });
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });
    
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes.set(email, { code, expires: Date.now() + 10 * 60000, name });
    
    console.log(`📧 Verification code for ${email}: ${code}`);
    
    await transporter.sendMail({
      to: email,
      subject: 'Your Verification Code - PizzaHub',
      html: `<h1>PizzaHub 🍕</h1><p>Your verification code is: <strong>${code}</strong></p><p>Expires in 10 minutes.</p>`
    });
    
    res.json({ message: 'Verification code sent!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email' });
  }
});

// ========== VERIFY CODE & REGISTER ==========
router.post('/verify-and-register', async (req, res) => {
  try {
    const { email, code, name, password } = req.body;
    
    const stored = verificationCodes.get(email);
    if (!stored) return res.status(400).json({ message: 'No code found. Request new one.' });
    if (stored.expires < Date.now()) return res.status(400).json({ message: 'Code expired' });
    if (stored.code !== code) return res.status(400).json({ message: 'Invalid code' });
    
    const user = new User({ name, email, password, isVerified: true, role: 'user' });
    await user.save();
    verificationCodes.delete(email);
    
    res.status(201).json({ message: 'Registration successful! Please login.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== LOGIN ==========
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("EMAIL:", email);
    const user = await User.findOne({ email });
    console.log("USER FOUND:", user);
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });
    
    const token = jwt.sign({ userId: user._id, role: user.role }, 'mysecretkey', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== FORGOT PASSWORD ==========
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    await transporter.sendMail({
      to: email,
      subject: 'Reset Your Password - PizzaHub',
      html: `<h1>Reset Password 🔐</h1><p>Click <a href="${resetUrl}">here</a> to reset your password. Expires in 1 hour.</p>`
    });
    
    res.json({ message: 'Password reset email sent!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== RESET PASSWORD ==========
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
    
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    
    res.json({ message: 'Password reset successful! Please login.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ========== VERIFY RESET TOKEN ==========
router.get('/verify-reset-token/:token', async (req, res) => {
  try {
    const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: 'Invalid token' });
    res.json({ valid: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;