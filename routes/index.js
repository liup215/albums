var express = require('express');
var router = express.Router();

router.get('/',function (req, res, next) {
	// body...
	res.redirect("/index");
})

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index',{});
});

module.exports = router;
