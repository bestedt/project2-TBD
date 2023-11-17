// routes/homeRoutes.js
const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.render('homepage');
});

module.exports = router;
