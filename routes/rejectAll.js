var express = require('express');
var router = express.Router();
var { Deals } = require("../src/sequelizer");

router.post('/', async function (req, res, next) {

    var rejectReason = req.body.deal_solution_text;
    var inProccess = "in process";

    try {
        const result = await Deals.update({
            deal_status: "reject",
            deal_solution_text: rejectReason,
        },
            { where: { deal_status: inProccess } });

        console.log(result);
        
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