var express = require('express');
var router = express.Router();
var { Deals } = require("../src/sequelizer");


router.get('/:id', async function (req, res, next) {
    var dealId = req.params.id;

    const result = await Deals.update({
        deal_status: "in process"
    },
        { where: { deal_id: dealId } });

    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;