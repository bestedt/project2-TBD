// import express router and models
const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

router.post('/createaccount', async (req, res) => {
  try {
    const { usertype, username, email, password } = req.body;

    // Validate user input (username, password, email)
    if (!usertype || !username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

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
      usertype: usertype,
      username: username,
      email: email,
      password: hashedPassword,
    });
// return success message
    res.status(201).json({ message: 'User account created successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// export the router
module.exports = router;
