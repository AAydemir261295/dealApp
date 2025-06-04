var express = require('express');
var router = express.Router();
var { Deals } = require("../src/sequelizer");
const { STATUS_REJECT, STATUS_INPROCESS } = require('../src/finals');

router.post('/', async function (req, res, next) {

    var rejectReason = req.body.deal_solution_text;

    try {
        const result = await Deals.update({
            deal_status: STATUS_REJECT,
            deal_solution_text: rejectReason,
        },
            { where: { deal_status: STATUS_INPROCESS } });


        if (result) {
            res.send({ "Текст отмены обращений": rejectReason });
        } else {
            res.sendStatus(418);
        }
    } catch {
        res.sendStatus(404);
    }
    // 
});

module.exports = router;