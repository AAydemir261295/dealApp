var express = require('express');
var router = express.Router();
var { Deals } = require("../src/sequelizer");
const { Op } = require('sequelize');

router.get('/:from/:to', async function (req, res, next) {

    var timeStampFrom = req.params.from;
    var timeStampTo = req.params.to;
    //   [Op.gte]: 6,              // >= 6
    //   [Op.lte]: 7,              // <= 7
    try {
        const result = await Deals.findAll({
            raw: true,
            where:
            {
                deal_timestamp:
                {
                    [Op.and]:
                        { [Op.gte]: timeStampFrom, [Op.lte]: timeStampTo }
                }
            }
        });
        console.log(result);
        if (result) {
            res.send(result);
        } else {
            res.sendStatus(418);
        }
    } catch {
        res.sendStatus(404);
    }
});

// 
// 
// 
// 

router.get('/:from', async function (req, res, next) {

    var timeStampFrom = req.params.from;
    // 24 * 60 * 60 * 1000;
    var timeStampTo = parseInt(timeStampFrom) + 86400000;

    console.log(typeof timeStampFrom);

    try {
        const result = await Deals.findAll({
            raw: true,
            where:
            {
                deal_timestamp:
                {
                    [Op.and]:
                        { [Op.gte]: timeStampFrom, [Op.lte]: timeStampTo }
                }
            }
        });
        console.log(result);
        if (result) {
            res.send(result);
        } else {
            res.sendStatus(418);
        }
    } catch {
        res.sendStatus(404);
    }
});

module.exports = router;