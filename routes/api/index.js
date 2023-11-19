const router = require('express').Router();
const ticketRoutes = require('./ticketRoutes');
const userRoutes = require('./userRoutes');
const signInRoutes = require('./signInRoutes');
router.use('/tickets', ticketRoutes);
router.use('/users', userRoutes);
router.use('/login', signInRoutes);
module.exports = router;
