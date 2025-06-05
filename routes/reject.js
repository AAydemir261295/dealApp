var express = require('express');
var router = express.Router();
var { Deals } = require("../src/Sequelizer");
const { STATUS_REJECT } = require('../src/finals');
const { sanitizeCache } = require('../src/CacheSanitizer');

router.post('/', async function (req, res, next) {

    var item = req.body;

    try {
        const result = await Deals.update({
            deal_status: STATUS_REJECT,
            deal_solution_text: item.deal_solution_text,
        },
            {
                where:
                    { deal_id: item.deal_id },
                returning: true,
                plain: true
            });
        if (result) {
            sanitizeCache(result[1].dataValues.deal_timestamp);
            res.send({ "Текст отмены обращения": item.deal_solution_text });
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
    // 
});

module.exports = router;