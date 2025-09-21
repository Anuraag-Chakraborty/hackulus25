const express = require('express');
const router = express.Router();
const MentoringRequest = require('../models/MentoringRequest');

// Create a mentoring request
router.post('/', async (req, res) => {
  try {
    const { paperId, researcherId, mentorId, creditsExchanged } = req.body;

    const newRequest = new MentoringRequest({ paperId, researcherId, mentorId, creditsExchanged });
    await newRequest.save();

    res.json(newRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all mentoring requests for a mentor
router.get('/mentor/:mentorId', async (req, res) => {
  try {
    const requests = await MentoringRequest.find({ mentorId: req.params.mentorId })
      .populate('paperId', 'title')
      .populate('researcherId', 'name email');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update request status to completed
router.patch('/:id/complete', async (req, res) => {
  try {
    const request = await MentoringRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ msg: 'Request not found' });

    request.status = 'completed';
    await request.save();

    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
