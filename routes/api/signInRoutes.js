const express = require('express');
const router = express.Router();

// Sign In route
router.get('/', (req, res) => {
  res.render('login'); // Assuming you have a login.handlebars file in your views folder
});


module.exports = router;