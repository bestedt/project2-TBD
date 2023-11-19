const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Ticket extends Model {}

Ticket.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['created', 'doing', 'done', 'closed']]
              },
        },
        creator_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        doner_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        doing_time: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        done_time: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        close_time: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'ticket',
    }
);

module.exports = Ticket