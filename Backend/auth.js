const  express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('register', async (req, res)=>{
  try{
    const {username, password} = req.body;
    const [existingUser] = await db.exexute(
      'SELECT 1 FROM users WHERE username = ? OR email = ?',
      [username, email]    
    );

    if(existingUser.length > 0){
      return res.status(409).json({message: 'Username or email already exists'});    
    } 

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const[result] = await db.execute(
      'INSERT INTO users (username, email, password_hash) VALUES (?,?,?)',
      [username, email, hashedPassword]    
    );

    res.status(201).json({message: 'Us:er registerd successfully'});
 } catch (error){
    console.error('Error registering user:', error);
    res.status(500).json({message: 'Error registering user'});
 }
});

router.post('/login', async (req, res)=>{
  try{
    const {username, password} = req.body;
    cosnt[user] = await db.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
    );
    const isMatch = await bcrypt.compare(password, user[0].password_hash);
   
    if(!isMatch){
      return res.status(401).json({message:'Invalid username or password'});    
    }
    
    const token = jwt.sign({userid: user[0].id}, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.json({toke});
} catch (error) {
  console.error('Error logging in:', error);
  res.status(500).json({message: 'Error logging in'});

  }     
});

module.exports = router;