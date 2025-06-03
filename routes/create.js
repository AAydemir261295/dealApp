var express = require('express');
var router = express.Router();
var { Deals } = require("../src/sequelizer");
const { STATUS_NEW } = require('../src/finals');
// var statuses = require("../src/finals");

router.post('/', async function (req, res, next) {
  var deal = req.body;
  var timeStamp = Date.now();

  var item = {
    ...deal,
    deal_status: STATUS_NEW,
    deal_timestamp: timeStamp
  }

  const result = await Deals.create(item);

  if (result) {
    res.send({ "Текст обращения": result.dataValues.deal_text, "Тема обращения": result.dataValues.deal_theme });
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
