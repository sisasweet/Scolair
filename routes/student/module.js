var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
var Module = require('../../model/module');
var User = require('../../model/user');

var module;
var error;

function showData(res) {
    Module.find().populate("id_ens", "name").exec(function (err, result1) {
        if (err) throw err;
        if (result1.length != 0) {
            User.find({
                enseignant: true
            }, function (err, result2) {
                if (err) throw err;
                if (result2.length != 0) {
                    res.render('student/module', {module: result1, enseignant: result2, error: error});
                } else {
                    res.render('student/module', {module: result1, enseignant: '', error: error});
                }
            });
        } else {
            error = 4;
            User.find({
                    enseignant: true
                }, function (err, result2) {
                    if (err) throw err;
                    if (result2.length != 0) {
                        res.render('student/module', {module: '', enseignant: result2, error: error});
                    } else {
                        res.render('student/module', {module: '', enseignant: '', error: error});
                    }
                }
            );
        }
    });
}


router.get('/', function (req, res) {
    error = 0;
    showData(res);
});

router.put('/', function (req, res) {
    if (req.body.name != "" && req.body.ens != "") {
        module = new Module({
            name: req.body.name,
            id_ens: req.body.ens
        });
        module.save(function (err) {
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

router.get('/:module', function (req, res) {
    Module.find({name: req.param('module')}, function (err, result) {
        if (err) throw err;
        User.find({enseignant: true}, function (err, result2) {
            if (err) throw err;
            res.render('gestion_module', {module: result, enseignant: result2, error: error});
        })
    });
});

router.delete('/:module', function (req, res) {
    Module.find({name: req.param('module')}).remove(function (err, result) {
        res.redirect('./');
    });
});

router.post('/:module', function (req, res) {
    if (req.body.name != "" && req.body.ens != "") {
        Module.find({name: req.param('module')}, function (err, result) {
            Module.update({_id: result[0]._id}, {
                $set: {
                    name: req.body.name,
                    id_ens: req.body.ens
                }
            }, function (err) {
                if (err) throw err;
                res.redirect('./' + req.body.name)
            });
        });

    }
});

module.exports = router;