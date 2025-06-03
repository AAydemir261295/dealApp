var express = require('express');
var router = express.Router();
var { Deals } = require("../src/sequelizer");
const { STATUS_REJECT } = require('../src/finals');

router.post('/', async function (req, res, next) {

    var item = req.body;

    try {
        const result = await Deals.update({
            deal_status: STATUS_REJECT,
            deal_solution_text: item.deal_solution_text,
        },
            { where: { deal_id: item.deal_id } });
        if (result) {
            res.send({ "Текст отмены обращения": item.deal_solution_text });
        } else {
            res.sendStatus(418);
        }
    } catch {
        res.sendStatus(404);
    }
    // 
});

module.exports = router;