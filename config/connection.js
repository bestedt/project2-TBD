const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

'mysql://k0y7eazmr4hqbvi8:vd1ytqr4lwx1j7fr@ro2padgkirvcf55m.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/bxvs2c4trvdafk7e'

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(
    process.env.JAWSDB_URL, 
    {
    dialect: 'mysql',
    dialectOptions: {
      typeCast: function (field, next) { // for reading from database
        if (field.type === 'DATETIME') {
          return field.string()
        }
          return next()
        },
    },
    timezone: '+00:00',
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      dialectOptions: {
        typeCast: function (field, next) { // for reading from database
          if (field.type === 'DATETIME') {
            return field.string()
          }
            return next()
          },
          
      },
      timezone: "-5:00",
    }
  );
}

module.exports = sequelize;
