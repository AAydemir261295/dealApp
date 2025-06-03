var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/create', function(req, res, next) {

  var deal = req.body;

  

  res.render('index', { title: 'Express' });
});

module.exports = router;
