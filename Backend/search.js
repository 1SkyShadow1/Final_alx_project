const express = require('express');
const router = express.Router();

router.get('/', async (req, res)=>{
  try{
    const {query, skills, location, dateFrom, dateTo} = req.body;

    let queryStr = 'SELECT * FROM gigs WHERe title LIKE ? OR description LIKE ?';
    let params = [`%${query}%`, `%${query}%`];

    if(skills){
        const skillIds = skills.split(',');
        queryStr += `AND JSON_CONTAINS(skills_required, JSON_ARRAY(${skillIds.join(',')}))`;
    }

    if (location){
      queryStr += 'AND location LIKE ?';    
      params.push(`%${location}`);
    }

    if (dateFrom){
      queryStr += 'AND date >= ?';
      params.push(dateFrom);    
    }

    if(dateTo){
      queryStr += 'AND date <= ?';
      params.push(dateTo);    
    }

    const [rows] = await db.execute(queryStr, params);
    res.json(rows);
  } catch (error){
    console.error('Error searching gigs:', error);
    res.status(500).json({message: 'Error searching gigs'});
  }
});

module.exports = router;