const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Paper = require('../models/Paper');

// Submit a review for a paper
router.post('/', async (req, res) => {
  try {
    const { paperId, reviewerId, feedback } = req.body;

    const newReview = new Review({ paperId, reviewerId, feedback });
    await newReview.save();

    // Add review ID to paper's reviews array
    const paper = await Paper.findById(paperId);
    paper.reviews.push(newReview._id);
    await paper.save();

    res.json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all reviews for a paper
router.get('/paper/:paperId', async (req, res) => {
  try {
    const reviews = await Review.find({ paperId: req.params.paperId })
      .populate('reviewerId', 'name email role');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
