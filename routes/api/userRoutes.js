const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

// /api/users


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  try {
   
    const userData = await User.findOne({ where: { email:email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(password);

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
      req.session.username = userData.username;
      req.session.loggedIn = true;
      res.json({ message: 'You are now logged in!' });
      req.session.cookie
      res.render('homepage', {        
        loggedIn: req.session.loggedIn,
        is_manager: req.session.is_manager,
        is_superintendent: req.session.is_superintendent,
        user_id: req.session.user_id,
        username: req.session.username,
      });

     });

  } catch (err) {
    res.status(400).json(err);
  }
});
// Logout route
router.post('/logout', async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy();
  } 
  res.redirect('/login'); // Redirect to the login page after logout
});

// get user info
router.get('/:id', (req, res) => {
  User.findByPk(req.params.id)
  .then(userData=>res.json(userData))
  .catch(err=>console.error(err));
});

router.post('/createaccount', async (req, res) => {
  try {
    const { user_type, username, email, password } = req.body;

    // Validate user input (username, password, email)
    if (!user_type || !username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Checking if the user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: username },
          { email: email }
        ]
      }
    });
// if user already exists, return error
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Creating a new user with the hashed password
    const newUser = await User.create({
      user_type: user_type,
      username: username,
      email: email,
      password: password,
    });
// return success message
    res.status(201).json({ message: 'User account created successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;