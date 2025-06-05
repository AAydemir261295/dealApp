var express = require('express');
var router = express.Router();
var { Deals } = require("../src/Sequelizer");
const { STATUS_REJECT, STATUS_INPROCESS } = require('../src/finals');
const { sanitizeCacheMultiple } = require('../src/CacheSanitizer');

router.post('/', async function (req, res, next) {

    var rejectReason = req.body.deal_solution_text;

    try {
        const result = await Deals.update({
            deal_status: STATUS_REJECT,
            deal_solution_text: rejectReason,
        },
            {
                where:
                    // [Op.or]:
                    // [{ deal_status: STATUS_NEW },
                    // { deal_status: STATUS_INPROCESS }]
                    { deal_status: STATUS_INPROCESS },
                returning: true,
                plain: false
            });


        if (result) {
            sanitizeCacheMultiple(result[1].map((v) => v.dataValues.deal_timestamp))
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