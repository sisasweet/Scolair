var express = require('express');
var router = express.Router();
var User = require('.././model/user');


router.get('/', function(req, res, next) {

  res.render('introduction');
});
router.get('/admin', function(req, res, next) {

  res.render('admin/admin');
});
router.get('/admin/delib', function(req, res, next) {

  res.render('admin/delib');
});


module.exports = router;
