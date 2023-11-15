const router = require('express').Router();
const { Ticket, User } = require('../../models');

//get all the ticket
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

//get ticket by id
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

//get ticket by status
router.get('/:statusId', async (req, res) => {
    try {
        const ticketsData = await Ticket.findAll({
            where: {
                status_id: req.params.statusId,
            },
        }, {
            include: [{model: User}]
        });
        const tickets = ticketsData.map((ticket) => ticket.get({ plain: true }));
        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json(err);
    }
});

// post, creat new ticket
router.post('/', (req, res) => {
    Ticket.create(req.body)
    .then(newTicket=>{
        res.json(newTicket);
    })
    .catch(err=>{
        res.json(err);
    });
});

// TODO: put, update ticket status
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


//no need delete ticket, will keep all the tickets history data in db