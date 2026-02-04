require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/notes', noteRoutes);

// Health Check
app.get('/', (req, res) => res.send('API is running...'));

// Database Connection
// Replace this:
// mongoose.connect(process.env.MONGODB_URI)

// With this (temporary):
mongoose.connect("mongodb://127.0.0.1:27017/primetrade")
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('DB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));