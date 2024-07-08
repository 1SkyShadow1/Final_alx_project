const express = require('express');
const router = express.Router();

// Create a review
router.post('/', async (req, res) => {
  try {
    const { gigId, revieweeId, rating, comment } = req.body;
    const reviewerId = req.userId; 

    // Validate input
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if the gig poster is the reviewer 
    const [gig] = await db.execute(
      'SELECT 1 FROM gigs WHERE id = ? AND user_id = ?',
      [gigId, reviewerId]
    );
    if (gig.length === 0) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const [result] = await db.execute(
      'INSERT INTO reviews (gig_id, reviewer_id, reviewee_id, rating, comment) VALUES (?, ?, ?, ?, ?)',
      [gigId, reviewerId, revieweeId, rating, comment]
    );

    res.status(201).json({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Error creating review' });
  }
});

// Get reviews for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await db.execute(
      'SELECT r.*, u.username AS reviewer_username FROM reviews r JOIN users u ON r.reviewer_id = u.id WHERE r.reviewee_id = ?',
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

// Edit a review
router.put('/:reviewId', async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.userId; 

    // Validate input
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if the user is the reviewer
    const [review] = await db.execute(
      'SELECT 1 FROM reviews WHERE id = ? AND reviewer_id = ?',
      [reviewId, userId]
    );
    if (review.length === 0) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const [result] = await db.execute(
      'UPDATE reviews SET rating = ?, comment = ? WHERE id = ?',
      [rating, comment, reviewId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review updated successfully' });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Error updating review' });
  }
});

// Delete a review
router.delete('/:reviewId', async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.userId;

    // Check if the user is the reviewer
    const [review] = await db.execute(
      'SELECT 1 FROM reviews WHERE id = ? AND reviewer_id = ?',
      [reviewId, userId]
    );
    if (review.length === 0) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const [result] = await db.execute('DELETE FROM reviews WHERE id = ?', [reviewId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Error deleting review' });
  }
});

// Flag a review as inappropriate
router.post('/:reviewId/flag', async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.userId;

    // Check if the user is the reviewer (or another admin, if applicable)
    // const [review] = await db.execute(
    //   'SELECT 1 FROM reviews WHERE id = ? AND reviewer_id = ?',
    //   [reviewId, userId]
    // );
    // if (review.length === 0) {
    //   return res.status(403).json({ message: 'Unauthorized' });
    // }

    const [result] = await db.execute(
      'UPDATE reviews SET is_flagged = TRUE WHERE id = ?',
      [reviewId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review flagged successfully' });
  } catch (error) {
    console.error('Error flagging review:', error);
    res.status(500).json({ message: 'Error flagging review' });
  }
});

module.exports = router;