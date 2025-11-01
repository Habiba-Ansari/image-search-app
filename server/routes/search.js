const express = require('express');
const router = express.Router();
const Search = require('../models/Search');
const UnsplashService = require('../services/unsplashService');

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Please log in to search images' });
};

// POST /api/search - Search images
router.post('/', requireAuth, async (req, res) => {
  try {
    const { term } = req.body;

    if (!term || term.trim() === '') {
      return res.status(400).json({ error: 'Search term is required' });
    }

    const searchTerm = term.trim();

    // 1. Save search to database
    const searchRecord = new Search({
      userId: req.user._id,
      term: searchTerm
    });
    await searchRecord.save();

    // 2. Search Unsplash API
    const unsplashResults = await UnsplashService.searchImages(searchTerm);

    res.json({
      term: searchTerm,
      ...unsplashResults
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/top-searches - Get top 5 search terms
router.get('/top-searches', async (req, res) => {
  try {
    const topSearches = await Search.aggregate([
      {
        $group: {
          _id: '$term',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      },
      {
        $project: {
          term: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    res.json(topSearches);

  } catch (error) {
    console.error('Top searches error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/history - Get user's search history
router.get('/history', requireAuth, async (req, res) => {
  try {
    const userHistory = await Search.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(20)
      .select('term timestamp -_id');

    res.json(userHistory);

  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;