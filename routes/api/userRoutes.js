const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
   
    const userData = await User.findOne({ where: { email:email } });
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
      return;
    }

    req.session.save(async () => {
      req.session.is_manager = await userData.isManager();
      req.session.is_superintendent = await userData.isSuperintendent();
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      res.json({ message: 'You are now logged in!' });
      req.session.cookie
      res.render('homepage', {        
        loggedIn: req.session.loggedIn,
        is_manager: req.session.is_manager,
        is_superintendent: req.session.is_superintendent,
        user_id: req.session.user_id,
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