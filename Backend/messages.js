const express = require('express');
const router = express.Router();

// Send a message
router.post('/', async (req, res) => {
  try {
    const { receiverId, messageText } = req.body;
    const senderId = req.userId; // Get sender ID from the JWT

    // Fetch the sender's username (for notification)
    const [sender] = await db.execute(
      'SELECT username FROM users WHERE id = ?',
      [senderId]
    );
    const senderUsername = sender[0].username;

    const [result] = await db.execute(
      'INSERT INTO messages (sender_id, receiver_id, message_text) VALUES (?, ?, ?)',
      [senderId, receiverId, messageText]
    );

    // Create a notification for the receiver
    const [notificationResult] = await db.execute(
      'INSERT INTO notifications (user_id, notification_type, message) VALUES (?, ?, ?)',
      [receiverId, 'new_message', `You have a new message from ${senderUsername}`]
    );

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

// Get messages for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.userId; // Get the ID of the current user

    const [rows] = await db.execute(
      'SELECT m.*, s.username AS sender_username, r.username AS receiver_username FROM messages m JOIN users s ON m.sender_id = s.id JOIN users r ON m.receiver_id = r.id WHERE (m.sender_id = ? OR m.receiver_id = ?) ORDER BY m.created_at ASC',
      [currentUserId, currentUserId]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

module.exports = router;