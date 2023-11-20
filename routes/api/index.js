const router = require('express').Router();
const ticketRoutes = require('./ticketRoutes');
const userRoutes = require('./userRoutes');
const dataRoutes = require('./dataRoutes');

router.use('/data', dataRoutes);
router.use('/tickets', ticketRoutes);
router.use('/users', userRoutes);
module.exports = router;
