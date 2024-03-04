var express = require('express');
var router = express.Router();

/* GET home page. */
router.use(function(req, res) {
    res.render('not_found');
});

module.exports = router;
