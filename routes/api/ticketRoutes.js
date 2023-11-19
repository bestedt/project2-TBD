const router = require('express').Router();
const { Ticket, User } = require('../../models');
const { Op } = require("sequelize");

// /api/tickets

// for manager to get all the tickets
router.get('/manager', async (req, res) => {
    try {
        const ticketsData = await Ticket.findAll({
            include: [
                { model: User, as: 'creator' }, 
                { model: User, as: 'doner' }]
        });
        const tickets = ticketsData.map((ticket) => ticket.get({ plain: true }));
        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json(err);
    }
});

// for superintendent tickets list
router.get('/superintendent/:id', async (req, res) => {
    try {
        const user_id = req.params.id;
        const ticketsData = await Ticket.findAll({
            where: {
                [Op.or]: [
                  {doner_id: user_id},
                  {status_id: "1"}, // created tickets
                ]
            },
            include: [
                { model: User }, 
                { model: User }]
        });
        const tickets = ticketsData.map((ticket) => ticket.get({ plain: true }));
        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json(err);
    }
});

// for tenant tickets list
router.get('/tenant/:id', async (req, res) => {
    try {
        const user_id = req.params.id;
        const ticketsData = await Ticket.findAll({
            where: {creator_id: user_id},
            include: [
                { model: User }, 
                { model: User }]
        });
        const tickets = ticketsData.map((ticket) => ticket.get({ plain: true }));
        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get ticket by id
router.get('/:id', async (req, res) => {
    try {
        const ticketData = await Ticket.findByPk(req.params.id, {
            include: [
                { model: User }, 
                { model: User }]
        });
        res.status(200).json(ticketData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get tickets by status
router.get('/status/:statusId', async (req, res) => {
    try {
        const ticketsData = await Ticket.findAll({
            where: {
                status_id: req.params.statusId,
            },
            include: [
                { model: User }, 
                { model: User }]
        });
        const tickets = ticketsData.map((ticket) => ticket.get({ plain: true }));
        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Post, create a new ticket
router.post('/', (req, res) => {
    Ticket.create(req.body)
        .then(newTicket => {
            res.json(newTicket);
        })
        .catch(err => {
            res.json(err);
        });
});

// put, update ticket status
router.put('/:id', (req, res) => {
    if (req.body.statusId === '2') {
        // update ticket from created => doing
        Ticket.update({
            status_id: req.body.statusId,
            doing_time: new Date(),
            doner_id: req.body.user_id,
        },
        {
            where: {
                id: req.params.id,
            },
        }) 
        .then((updatedTicket) => {
            res.json(updatedTicket);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
    }

    if (req.body.statusId === '3') {
        // update ticket from doing => done
        Ticket.update({
            status_id: req.body.statusId,
            done_time: new Date(),
        },
        {
            where: {
                id: req.params.id,
            },
        }) 
        .then((updatedTicket) => {
            res.json(updatedTicket);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
    }

    if (req.body.statusId === '4') {
        // update ticket from done => close
        Ticket.update({
            status_id: req.body.statusId,
            close_time: new Date(),
        },
        {
            where: {
                id: req.params.id,
            },
        }) 
        .then((updatedTicket) => {
            res.json(updatedTicket);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
    }
    
});

module.exports = router;
//no need delete ticket, will keep all the tickets history data in db