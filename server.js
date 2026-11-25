
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Connect MongoDB
connectDB();

// Home Route
app.get('/', (req, res) => {
    res.send('User Authentication System API is Running');
});

// Authentication Routes
app.use('/api/auth', authRoutes);

// Protected Dashboard Route
app.get('/api/dashboard', authMiddleware, (req, res) => {
    res.json({
        message: 'Welcome to your protected dashboard!',
        user: req.user
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
