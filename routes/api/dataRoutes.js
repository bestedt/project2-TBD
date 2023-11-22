const router = require('express').Router();
const { Ticket, User } = require('../../models');
const { Op } = require("sequelize");
const moment = require('moment');

// /api/data/
// get service quality data
router.get('/serviceQuality', async (req, res) => {
    // current month service quality
    /*
    return: 
        {
            "total": total, // total tickets done or closed
            "meet": meet,   // the tickets meet the SLA
            "percent": percent   // meet the SLA percent
        }
    */
    try {
        const ticketsData = await Ticket.findAll({
            where: {
                [Op.or]: [
                    { status: 'done' },
                    { status: 'closed' }
                  ]
            }
        });
        const tickets = ticketsData.map((ticket) => ticket.get({ plain: true }));
        //console.log(tickets)
        const total = tickets.length; // total ticket number
        const meet = tickets.filter(t => {
            const startTime = moment(t.doing_time);
            const endTime = moment(t.done_time);
            const duration = moment.duration(endTime.diff(startTime));
            const diffHours = duration.asHours();
            if (diffHours < 24) {
                return t;
            }
        }).length;
        const percent = (meet/total*100).toFixed(2);
        const result = {
            "total": total,
            "meet": meet,
            "percent": percent
        }
        res.status(200).json(result);
    } catch (err) {
        console.error(err)
        res.status(500).json(err);
    }
});

module.exports = router;