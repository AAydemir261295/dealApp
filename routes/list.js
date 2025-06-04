var express = require('express');
var router = express.Router();

const { fromToCache, fromCache } = require('../src/cache');

router.get('/:from/:to', fromToCache, async function (req, res, next) {
    var isCached = req.cached;
    if (isCached) {
        res.send(isCached);
    } else {
        res.sendStatus(404);
    }
});

// 
// 
// 
// 

router.get('/:from', fromCache, async function (req, res, next) {
    var isCached = req.cached;
    if (isCached) {
        res.send(isCached);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;