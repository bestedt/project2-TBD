// routes/homeRoutes.js
const express = require('express');
const withAuth = require('../utils/auth');
const {Ticket} = require('../models/Ticket');
const router = express.Router();
const SERVER = `http://localhost:${process.env.PORT||3001}`

// Home route
router.get('/', withAuth, (req, res) => { 
  const is_manager = req.session.is_manager;
  const is_superintendent = req.session.is_superintendent;
  const user_id = req.session.user_id;
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
      //console.log(tickets)
      res.render('homepage', 
      {
        tickets,
        is_manager,
        is_superintendent,
        user_id,
        loggedIn: req.session.loggedIn,
      });
    });
});

// single ticke page
router.get('/ticket/:id', withAuth, (req, res) => {
  const is_manager = req.session.is_manager;
  const is_superintendent = req.session.is_superintendent;
  const user_id = req.session.user_id;
  const path = SERVER + `/api/tickets/${req.params.id}`
  fetch(path)
  .then(response=>response.json())
  .then(ticket=>{
    res.render('ticket', {
      ticket,
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


// create account
router.get('/createaccount',(req, res) => {
  res.render('createaccount');
});


// /newTicket
router.get('/newTicket', withAuth, (req, res) => { // withAuth
  res.render('newticket');
});

module.exports = router;
