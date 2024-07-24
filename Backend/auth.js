const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const db = require('./db'); 
const jwt = require('jsonwebtoken')

// Register a new user
router.post('/register-user', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body; 

    // Check if the email already exists
    const [existingUser] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    console.log("Email from request body: ", email); // Log incoming email

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Insert the new user into the database
    await db.execute(
      'INSERT INTO users (firstName, lastName, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword, 'user'] // Add role to the insert query
    );

    // console.log("SQL Insert Query: ", 'INSERT INTO users (firstName, lastName, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
    //   [firstName, lastName, email, hashedPassword, role]); // Log SQL query

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error); 
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Register a new worker
router.post('/register-worker', async (req, res) => {
  try {
    const { firstName, lastName, email, password, services } = req.body; 

    // Check if the email already exists
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    // Check if the email exists
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Insert the new worker into the database
    const [result] = await db.execute(
      'INSERT INTO users (firstName, lastName, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword, 'worker'] 
    );
    res.status(201).json({ message: 'Worker registered successfully' });
  } catch (error) {
    console.error('Error registering worker:', error);
    res.status(500).json({ message: 'Error registering worker' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (user.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcryptjs.compare(password, user[0].password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Get the user's role based on their ID
router.get('/user', async (req, res) => {
  try {
    const userId = req.userId; // Use the verified user ID from the middleware
    const [rows] = await db.execute('SELECT role FROM users WHERE id = ?', [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ role: rows[0].role }); // Return the role
  } catch (error) {
    console.error('Error fetching user role:', error);
    res.status(500).json({ message: 'Error fetching user role' });
  }
});

module.exports = router;