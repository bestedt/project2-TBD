const router = require('express').Router();
const { Ticket, User } = require('../../models');

// TODO: get all the ticket
router.get('/', async (req, res) => {
    try {
        const ticketsData = await Ticket.findAll({
            include: [{model: User}]
        });
        res.status(200).json(ticketsData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO: get ticket by id
router.get('/:id', async (req, res) => {
    try {
        const ticketData = await Ticket.findByPk(req,params.id, {
            include: [{model: User}]
        });
        res.status(200).json(ticketData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO: get ticket by status
router.get('/:id', async (req, res) => {
    try {
        const ticketData = await Ticket.findAll({
            where: {
                
            }
        }, {
            include: [{model: User}]
        });
        res.status(200).json(ticketData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO: post, creat new ticket

// TODO: put, update ticket status