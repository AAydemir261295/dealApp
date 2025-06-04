var express = require('express');
var router = express.Router();
var { Deals } = require("../src/Sequelizer");
const { Op } = require('sequelize');
const { STATUS_NEW, STATUS_INPROCESS, STATUS_CLOSED } = require('../src/finals');

router.post('/', async function (req, res, next) {

    var item = req.body;


    try {
        const result = await Deals.update({
            deal_status: STATUS_CLOSED,
            deal_solution_text: item.deal_solution_text,
        },
            {
                where: {
                    [Op.and]:
                        [{ deal_id: item.deal_id },
                        {
                            [Op.or]:
                                [{ deal_status: STATUS_NEW },
                                { deal_status: STATUS_INPROCESS }]
                        }]
                }
            });
        if (result) {
            res.send({ "Текст решения проблемы": item.deal_solution_text });
        } else {
            res.sendStatus(418);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});

module.exports = router;