const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("*********************** Iam here************" + email+password);
  try {
    // const { email, password } = req.body;
    // const userData = await User.findOne({ where: { email: req.body.email } });
    console.log(email);
    const userData = await User.findOne({ where: { email:email } });

    console.log("*********************** Iam here toooooooooo************");
    console.log(userData);
    if (!userData) {
      console.log("*********************** Iam here anthooooo************");
      res
        .status(400)
        .json({ message: 'Incorrect username, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log("*********************** Iam here pwwwwwwwwww************");
      res
        .status(400)
        .json({ message: 'Incorrect  password, please try again' });
      return;
    }

    req.session.save(() => {
      // req.session.user_id = userData.id;
      
      req.session.loggedIn = true;
      res.json({ message: 'You are now logged in!' });
      req.session.cookie
      res.render('homepage', 
      {        
        loggedIn: req.session.loggedIn,
      });

     });

  } catch (err) {
    res.status(400).json(err);
  }
});
// Logout route
router.post('/logout', async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect('/'); // Redirect to the login page after logout
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;