const sequelize = require('../config/connection');
const {User, Ticket, Status} = require('../models');

const userData = require('./userData.json');
const ticketData = require('./ticketData.json');
const statusData = require('./statusData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    await Ticket.bulkCreate(ticketData, {
        individualHooks: true,
        returning: true,
    });

    await Status.bulkCreate(statusData, {
        individualHooks: true,
        returning: true,
    });
  
    process.exit(0);
  };
  
  seedDatabase();