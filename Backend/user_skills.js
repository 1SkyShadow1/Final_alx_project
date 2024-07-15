const express = require('express');
const router = express.Router();
const db = require('./db');

// route used to get a specific skill for a user
router.get('/:userId/skills', async()=>{
  try{
    const {userId} = req.params;
    const [rows] = await db.execute(
        'SELECT s.* FROM user_skills us JOIN skills s ON us.skill_id = s.id WHERE us.user_id = ?',
        [userId]
    );
    res.json(rows); 
  } catch (error){
    console.error('Error fetching user skills:', error);
    res.status(500).json({message:'Error fetching user skills'});
  }
});

// route used to add a skill to a user's list
router.post('/:userId/skills', async(req, res)=>{
  try { 
    const {userId} = req.params;
    const {skillId} = req.body;

    const[result] = await db.execute(
      'INSERT INTO user_skills(user_id, skill_id)VAlUES(?,?)',
      [userId, skillId]
    );

    if (result.affectedRows > 0) {
      res.status(201).json({message:'Skill added to user successfully'});
    } else {
      throw new Error('No rows affected');    
    }
    
  } catch (error){
    console.error('Error adding skill to user:', error);
    res.status(500).json({message:'Error adding skill to user'});
  } 
}); 

// Route to remove a skill from a user's list

router.delete('/:userId/skills/:skillId', async (req, res)=>{
  try {
    const {userId, skillId} = req.params;
    const deleteSkill = async () => {
      const [result] = await db.execute(
        'DELETE FROM user_skills WHERE user_id = ? AND skill_id = ?',
        [userId, skillId]
      );

      if(result.affectedRows === 0){
        return res.status(404).json({message: 'skill not found for user'});
      }

      res.json({message: 'Skill removed from user successfully'});
    };

    await deleteSkill();
  } catch (error){
    console.error('Error removing skill from user',error);
    res.status(500).json({message: 'Error removing skill from user'});
  } 
});

module.exports = router;