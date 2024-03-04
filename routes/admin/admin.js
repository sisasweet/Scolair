var express = require('express');
var router = express.Router();
// if our user.js file is at app/models/user.js
var User = require('../../model/user');


router.get('/', function(req, res, next) {

  res.render('admin/admin');
});

module.exports = router;
