const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { name, description, sort } = req.query;
    let query = 'SELECT * FROM skills';
    let params = [];

    if (name) {
      query += ' WHERE name LIKE ?';
      params.push(`%${name}%`); 
    } 
    if (description) {
      if (params.length > 0) {
        query += ' AND description LIKE ?'; 
      } else {
        query += ' WHERE description LIKE ?';
      }
      params.push(`%${description}%`); 
    }

    if (sort === 'asc') {
      query += ' ORDER BY name ASC'; 
    } else if (sort === 'desc') {
      query += ' ORDER BY name DESC';
    }

    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ message: 'Error fetching skills' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;

    // 1. Insert the new skill into the database
    const [result] = await db.execute(
      'INSERT INTO skills (name, description) VALUES (?, ?)',
      [name, description]
    );

    res.status(201).json({ message: 'Skill added successfully' });
  } catch (error) {
    console.error('Error adding skill:', error);
    res.status(500).json({ message: 'Error adding skill' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const [result] = await db.execute(
      'UPDATE skills SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json({ message: 'Skill updated successfully' });
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ message: 'Error updating skill' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute('DELETE FROM skills WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ message: 'Error deleting skill' });
  }
});

module.exports = router;