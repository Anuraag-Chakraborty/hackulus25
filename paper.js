const express = require('express');
const router = express.Router();
const Paper = require('../models/Paper');

// Upload a new paper
router.post('/', async (req, res) => {
  try {
    const { title, abstract, authors } = req.body;

    const newPaper = new Paper({ title, abstract, authors });
    await newPaper.save();

    res.json(newPaper);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all papers
router.get('/', async (req, res) => {
  try {
    const papers = await Paper.find().populate('authors', 'name email role');
    res.json(papers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single paper by ID
router.get('/:id', async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id)
      .populate('authors', 'name email role')
      .populate('reviews');
    if (!paper) return res.status(404).json({ msg: 'Paper not found' });
    res.json(paper);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
