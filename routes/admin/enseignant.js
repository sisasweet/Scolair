var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
var Module = require('../../model/module');
var User = require('../../model/user');

var module;
var user;
var error;

function showData(res) {
    User.find({
        enseignant: true
    }, function (err, result) {
        if (err) throw err;
        if (result.length != 0) {
            res.render('admin/enseignant', {enseignant: result, error: error});
        } else {
            error = 4;
            res.render('admin/enseignant', {enseignant: '', error: error});
        }
    });
}

router.get('/', function (req, res) {
    error = 0;
    showData(res);
});

router.put('/', function (req, res) {
    if (req.body.name != "" && req.body.username != "" && req.body.password != "") {
        user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            enseignant: true
        });
        user.save(function (err) {
            if (err) {
                if (err.code == 11000) {
                    error = 3;
                    showData(res);
                }
            } else {
                error = 1;
                showData(res);
            }
        });
    } else {
        error = 2;
        showData(res);
    }
});

router.get('/:username', function (req, res) {
    User.find({username: req.param('username')}, function (err, result) {
        if (err) throw err;
        res.render('admin/gestion_enseignant', {enseignant: result, error: error});
    });
});

router.delete('/:username', function (req, res) {
    User.find({username: req.param('username')}, function (err, result) {
        if (err) throw err;
        Module.find({id_ens: result[0]._id}).remove(function (err, result) {
            User.find({username: req.param('username')}).remove(function (err, result) {
                res.redirect('./');
            });
        });
    });

});

router.post('/:username', function (req, res) {
    if (req.body.name != "" && req.body.username != "" && req.body.password != "") {
        User.find({username: req.param('username')}, function (err, result) {
            User.update({_id: result[0]._id,}, {$set: {name: req.body.name, username: req.body.username, password: req.body.password}}, function (err) {
                if (err) throw err;
                res.redirect('./' + req.body.username)
            });
        });

    }
});

module.exports = router;