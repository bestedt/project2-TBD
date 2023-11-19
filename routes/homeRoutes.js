// routes/homeRoutes.js
const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.render('homepage');
});

// sign in 
router.get('/login',(req, res) => {
  res.render('login');
});

// create account
router.get('/createaccount',(req, res) => {
  res.render('createaccount');
});
// dashboard
router.get('/dashboard', (req, res) => {
  const userId = req.session.user_id;
  fetch(SERVER + `/api/blogs/user/${userId}`)
  .then(response=>response.json())
      .then(blogs=>{
          res.render('myBlogs', {
              blogs,
              logged_in: req.session.logged_in,   // session login data
          });
      })
      .catch(error => {
          console.error('Error', error);
      });
});

module.exports = router;
