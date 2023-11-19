// routes/homeRoutes.js
const express = require('express');
const withAuth = require('../utils/auth');
const {Ticket} = require('../models/Ticket');
const router = express.Router();
const SERVER = `http://localhost:${process.env.PORT||3001}`

// Home route
router.get('/', (req, res) => { // need withAuth, remove for dev
  const is_manager = true; // for the dev purpose, should be req.session.is_manager,
  const is_superintendent = false;  // for the dev purpose, should be req.session.is_superintendent,
  const user_id = "1"; // for the dev purpose, should be  req.session.user_id;
  let path;
  if (is_manager) {
    path = SERVER + `/api/tickets/manager`
  } else if (is_superintendent) {
    path = SERVER + `/api/tickets/superintendent/${user_id}`
  } else {
    path = SERVER + `/api/tickets/tenant/${user_id}`
  }
    fetch(path)
    .then(response=>response.json())
    .then(tickets=>{
      console.log(tickets)
      res.render('homepage', 
      {
        tickets,
        is_manager,
        is_superintendent,
        user_id,
      });
    });
});

// sign in 
router.get('/login',(req, res) => {
  res.render('login');
});

// /ticket/:id
router.get('ticket/:id', withAuth, (req, res) => {
  res.render('ticket', {
    is_manager: true, // for the dev purpose, should be req.session.is_manager,
    is_superintendent: false, // for the dev purpose, should be req.session.is_superintendent,
    user_id: "1", // for the dev purpose, should be  req.session.user_id;
  });
});

module.exports = router;
