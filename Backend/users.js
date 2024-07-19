const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const db = require('./db');

// Get a user's profile by ID
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const [user] = await db.execute(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch associated skills
    const [skills] = await db.execute(
      'SELECT s.name FROM user_skills us JOIN skills s ON us.skill_id = s.id WHERE us.user_id = ?',
      [userId]
    );

    // Fetch gig applications
    const [applications] = await db.execute(
      'SELECT ga.*, g.title AS gig_title FROM gig_applications ga JOIN gigs g ON ga.gig_id = g.id WHERE ga.user_id = ?',
      [userId]
    );

    res.json({
      user: user[0],
      skills: skills.map(row => row.name),
      applications,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Update a user's profile by ID
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, password } = req.body;

    let updateQuery = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
    let updateParams = [username, email, userId];

    if (password) {
      const hashedPassword = await bcryptjs.hash(password, 10);
      updateQuery += ' AND password_hash = ?';
      updateParams.push(hashedPassword);
    }

    const [result] = await db.execute(updateQuery, updateParams);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
});

// Update a user's password by ID
router.put('/:userId/password', async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;

    const [user] = await db.execute(
      'SELECT password_hash FROM users WHERE id = ?',
      [userId]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcryptjs.compare(currentPassword, user[0].password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid current password' });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    const [result] = await db.execute(
      'UPDATE users SET password_hash = ? WHERE id = ?',
      [hashedPassword, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Error updating password' });
  }
});

// Get a user's skills by ID
router.get('/:userId/skills', async (req, res) => {
  try {
    const { userId } = req.params;
    const [skills] = await db.execute(
      'SELECT s.name FROM user_skills us JOIN skills s ON us.skill_id = s.id WHERE us.user_id = ?',
      [userId]
    );
    res.json({ skills: skills.map(row => row.name) });
  } catch (error) {
    console.error('Error fetching user skills:', error);
    res.status(500).json({ message: 'Error fetching user skills' });
  }
});

// Update a user's skills by ID
router.put('/:userId/skills', async (req, res) => {
  try {
    const { userId } = req.params;
    const { skills } = req.body;

    // Delete existing skills for the user
    await db.execute(
      'DELETE FROM user_skills WHERE user_id = ?',
      [userId]
    );

    // Insert new skills
    for (const skill of skills) {
      // Get skill ID
      const [skillResult] = await db.execute('SELECT id FROM skills WHERE name = ?', [skill]);
      const skillId = skillResult[0].id;

      // Insert user-skill association
      await db.execute(
        'INSERT INTO user_skills (user_id, skill_id) VALUES (?, ?)',
        [userId, skillId]
      );
    }

    res.json({ message: 'User skills updated successfully' });
  } catch (error) {
    console.error('Error updating user skills:', error);
    res.status(500).json({ message: 'Error updating user skills' });
  }
});

module.exports = router;