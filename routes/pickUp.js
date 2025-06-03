var express = require('express');
var router = express.Router();
var { Deals } = require("../src/sequelizer");
const { STATUS_NEW, STATUS_INPROCESS } = require('../src/finals');


router.get('/:id', async function (req, res, next) {

    var dealId = req.params.id;

    const result = await Deals.update({
        deal_status: STATUS_INPROCESS
    },
        { where: { deal_id: dealId, deal_status: STATUS_NEW } });

    console.log(result);

    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;