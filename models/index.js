const User = require('./User');
const Ticket = require('./Ticket');

User.hasMany(Ticket, {
    foreignKey: 'creator_id',
    onDelete: 'CASCADE',
    as: 'creator',
});

Ticket.belongsTo(User, {foreignKey: 'creator_id', as: 'creator'});

User.hasMany(Ticket, {
    foreignKey: 'doner_id',
    onDelete: 'CASCADE',
    as: 'doner',
});

Ticket.belongsTo(User, {foreignKey: 'doner_id', as: 'doner'});


module.exports = { User, Ticket };