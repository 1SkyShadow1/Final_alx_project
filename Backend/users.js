const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const db = require('./db');

// used to get  the user profile
router.get('/:userId', async (req, res)=>{
  try{
    const {userId} = req.params;
    const [user] = await db.execute(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );
    
    if(user.length === 0){
      return res.status(404).json({message: 'User not found'});
    }

    // used to fetch the user's skills
    const [skills] = await db.execute(
      'SELECT * FROM skills WHERE user_id = ?',
      [userId]
    );

    // used to fetch the user's gig applications
    const [applications] = await db.execute(
      'SELECT * FROM applications WHERE user_id = ?',
      [userId]
    );

    res.json({user: user[0], 
      skills: skills.map(row => row.name), 
      applications
    });

    // used to fetch the user's reiews
    const [reviews] = await db.execute(
      'SELECT r.*, u.username AS reviewer_username FROM reviews AS r INNER JOIN users AS u ON r.reviewer_id = u.id where r.reviewee_id = ?', 
      [userId]
    );

    res.json({
      ...user[0],
      skills: skills.map(row=> row.name),
      applications,
      reviews
    });
  } catch (error){
    console.error('Error fetching user profile: ',error);
    res.status(500).json({message: 'Error fetching user profile'})
  }
});


// used to update the user profile
router.put('/:userId', async (req, res) =>{
  try{
    const {userId} = req.params;
    const {username, email, password} = req.body;

    let updateQuery = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
    let updateParams = [username, email, userId];

    if(password){
      const hashedPassword = await bcryptjs.hash(password, 10);
      updateQuery += 'AND password_hash=?';
      updateParams.push(hashedPassword); 
    }

    const[result] = await db.execute(updateQuery, updateParams);

    if(result.affectedRows === 0){
      return res.status(404).json({mssage:'User not found'});
    }

    res.json({message: 'User profile updated successfully'});
  } catch {
    console.error('Error updating user profile:', error);
    res.status(500).json({message:'Error updating user profile'});
  }
});

// used to update an existing user's password
router.put( '/:userId/password', async (req, res) =>{
  try{
    const {userId} = req.params;
    const {currentPassword, newPassword} = req.body;

    const [user] = await db.execute(
      'SELECT password_hash FROM users WHERE id = ?',
      [userId] 
    );

    if(user.length === 0){
      return res.status(404).json({message:'User not found'}); 
    }

    const isMatch = await bcryptjs.compare(currentPassword, user[0].password_hash);
    if(!isMatch){
      return res.status(401).json({message:'Invalid current password'}); 
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    const [result] = await db.execute(
      'UPDATE users SET password_hash = ? WHERE id = ?',
      [hashedPassword, userId] 
    );

    if (result.affectedRows === 0){
      return res.status(404).json({message:'User not found'}); 
    }
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).jsosn({message:'Error updating password'});
  }
});

// Register a new user
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body; 

    // Check if the email already exists
    const [existingUser] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Insert the new user into the database
    const [result] = await db.execute(
      'INSERT INTO users (firstName, lastName, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword, role] // Add role to the insert query
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

module.exports = router;