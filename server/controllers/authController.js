const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Signup Logic
// server/controllers/authController.js

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Signup data received:", { name, email });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ name, email, password });
    await user.save();

    // Fix: Agar process.env.JWT_SECRET undefined hai toh hardcoded string use karein
    const secret = process.env.JWT_SECRET || "primetrade_secret_key_123";
    
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1d' });
    
    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (err) {
    console.error("Signup Error:", err); // Isse terminal mein asli wajah dikhegi
    res.status(500).json({ message: 'Internal Server Error: ' + err.message });
  }
};

// Login Logic
exports.login = async (req, res) => {
  console.log("Backend: Login attempt for:", req.body.email);
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

    const secret = process.env.JWT_SECRET || "primetrade_secret_key_123";
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1d' });
    
    res.json({ token, user: { id: user._id, name: user.name, email } });
  } catch (err) {
    console.error("Backend Login Error:", err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};