var express = require('express');
var router = express.Router();
var { Deals } = require("../src/sequelizer");

router.post('/', async function (req, res, next) {

    var item = req.body;

    try {
        const result = await Deals.update({
            deal_status: "reject",
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

});

module.exports = router;