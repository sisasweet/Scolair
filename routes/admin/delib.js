var express = require('express');
var router = express.Router();
// if our user.js file is at app/models/user.js
var User = require('../../model/user');

router.get('/', function (req, res) {

    res.render('admin/delib');
});

router.post('/', function (req, res) {
    var delib = req.files.delib;
    delib.mv('./public/images/upload/delib.jpg', function (err) {
        if (err) throw err;
        res.render('admin/delib');
    });
})

module.exports = router;
