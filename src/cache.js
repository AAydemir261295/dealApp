var redis = require("redis");
const { Op } = require('sequelize');
const { Deals } = require("./sequelizer");
var client = redis.createClient();
client.connect();


async function fromToCache(req, res, next) {
    var timeStampFrom = req.params.from;
    var timeStampTo = req.params.to;

    try {
        const key = JSON.stringify({
            type: "fromTo",
            from: timeStampFrom,
            to: timeStampTo
        });

        const cacheValue = await client.get(key);

        if (cacheValue) {
            req.cached = cacheValue;
            next();
        } else {
            try {
                const result = await Deals.findAll({
                    raw: true,
                    where:
                    {
                        deal_timestamp:
                        {
                            [Op.and]:
                                { [Op.gte]: timeStampFrom, [Op.lte]: timeStampTo }
                            //   [Op.gte]: 6,              // >= 6
                            //   [Op.lte]: 7,              // <= 7
                        }
                    }
                });
                if (result.length > 0) {
                    await client.set(key, JSON.stringify(result), { EX: 5 * 60 });
                }
                req.cached = result;
                next();
            } catch (error) {
                req.cached = false;
                next();
            }
        }
    } catch (error) {
        console.log(error);
        req.cached = false;
        next();
    }
}

async function fromCache(req, res, next) {

    // timeStampFrom come from front 
    // with day start hour in miliseconds
    var timeStampFrom = req.params.from;
    // 24 * 60 * 60 * 1000;
    var timeStampTo = parseInt(timeStampFrom) + 86399999;

    try {
        const key = JSON.stringify({
            type: "from",
            from: timeStampFrom,
            to: timeStampTo
        });

        const cacheValue = await client.get(key);

        if (cacheValue) {
            req.cached = cacheValue;
            next();
        } else {
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
                if (result.length > 0) {
                    await client.set(key, JSON.stringify(result), { EX: 5 * 60 });
                }
                req.cached = result;
                next();
            } catch (error) {
                console.log(error);
                req.cached = false;
                next();
            }
        }
    } catch (error) {
        console.log(error);
        req.cached = false;
        next();
    }
}

module.exports = { fromToCache, fromCache };