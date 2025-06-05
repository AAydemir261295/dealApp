var express = require('express');
var router = express.Router();
var { Deals } = require("../src/Sequelizer");
const { STATUS_NEW, STATUS_INPROCESS } = require('../src/finals');
const { sanitizeCache } = require('../src/CacheSanitizer');


router.get('/:id', async function (req, res, next) {

    var dealId = req.params.id;

    try {
        const result = await Deals.update({
            deal_status: STATUS_INPROCESS
        },
            {
                where:
                    { deal_id: dealId, deal_status: STATUS_NEW },
                returning: true,
                plain: true
            });

        if (result) {
            sanitizeCache(result[1].dataValues.deal_timestamp);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});

module.exports = router;