const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const jwt = require('jsonwebtoken'); 
const bcryptjs = require('bcryptjs');
const db = require('./db'); 
const authRoutes = require('./auth');
const skillRoutes = require('./skills');
const gigRoutes = require('./gigs');
const userRoutes = require('./users');
const userSkillsRoutes = require('./user_skills'); // Import user skills routes
const messageRoutes = require('./messages');
const searchRoutes = require('./search');
const notificationRoutes = require('./notifications'); 
const roleRoutes = require('./roles');
const reviewRoutes = require('./reviews'); 


// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json()); 
app.use(helmet());

// Mount routes 
app.use('/api/users', authRoutes); 
app.use('/api/skills', skillRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/users', userRoutes);
app.use('/api/user_skills', userSkillsRoutes); 
app.use('/api/messages', messageRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/notifications', notificationRoutes); 
app.use('/api/roles', roleRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});