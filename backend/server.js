require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carRoutes = require('./routes/carRoutes');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Serve static files from the public directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Add car and auth routes
app.use('/api', carRoutes);
app.use('/api/auth', authRoutes);

// Add a new route to handle navigation logic
app.post('/navigate', (req, res) => {
  const { path } = req.body;

  const allowedPaths = ['/', '/about', '/login'];
  if (!allowedPaths.includes(path)) {
    return res.status(400).json({ success: false, message: 'Invalid path' });
  }

  res.json({ success: true, redirectUrl: path });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
