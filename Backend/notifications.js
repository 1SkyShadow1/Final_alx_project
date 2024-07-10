const express = require('express');
const router = express.Router();

// Get notifications for a specific user
router.get('/', async (req, res) => { 
  try {
    const userId = req.userId; 

    const [rows] = await db.execute(
      'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

// Mark a notification as read
router.put('/:notificationId/read', async (req, res) => { 
  try {
    const { notificationId } = req.params;
    const userId = req.userId; 

    // Check if the notification belongs to the current user
    const [notification] = await db.execute(
      'SELECT 1 FROM notifications WHERE id = ? AND user_id = ?',
      [notificationId, userId]
    );
    if (notification.length === 0) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const [result] = await db.execute(
      'UPDATE notifications SET is_read = TRUE WHERE id = ?',
      [notificationId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Error marking notification as read' });
  }
});

module.exports = router;