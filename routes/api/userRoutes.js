const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  console.log("Successfull Babe");
  try {
    const userData = await User.findOne({ 
      where: { 
        email: req.body.email,
      }, 
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect  password, please try again' });
        console.log("Successfull Babe");
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.cookie
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
  // Get the authentication status from the session or any other mechanism
  const isAuthenticated = req.session.isAuthenticated || false;

  // Render the login page and pass the authentication status to the view
  res.render('login', { isAuthenticated });
});
//Need to plug this route for logout events
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;