const express = require('express');
const router = express.Router();

// Get all roles
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT DISTINCT role FROM users');
    res.json(rows.map(row => row.role));
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ message: 'Error fetching roles' });
  }
});

// Add a new role (only for administrators)
router.post('/', async (req, res) => { 
  // Add authorization logic here to allow only admins to create roles
  try {
    const { role } = req.body;

    const [result] = await db.execute(
      'INSERT INTO users (role) VALUES (?)',
      [role]
    );

    res.status(201).json({ message: 'Role created successfully' });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ message: 'Error creating role' });
  }
});

// ... (Add routes for deleting or updating roles) ...

module.exports = router;