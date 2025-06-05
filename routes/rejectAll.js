var express = require('express');
var router = express.Router();
var { Deals } = require("../src/Sequelizer");
const { STATUS_REJECT, STATUS_INPROCESS, STATUS_NEW } = require('../src/finals');
const { sanitizeCacheMultiple } = require('../src/CacheSanitizer');
const { Op } = require('sequelize');

router.post('/', async function (req, res, next) {
    var rejectReason = req.body.deal_solution_text;

    try {
        const result = await Deals.update({
            deal_status: STATUS_REJECT,
            deal_solution_text: rejectReason,
        },
            {
                where:
                {
                    deal_status: { [Op.or]: [STATUS_NEW, STATUS_INPROCESS] }
                },
                returning: true,
                plain: false
            });


        if (result) {
            sanitizeCacheMultiple(result[1].map((v) => v.dataValues.deal_timestamp))
            res.send({ "Текст отмены обращений": rejectReason });
        } else {
            res.sendStatus(418);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
    // 
});

module.exports = router;