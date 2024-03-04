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
                    res.render('enseignant/module', {module: result1, enseignant: result2, error: error});
                } else {
                    res.render('enseignant/module', {module: result1, enseignant: '', error: error});
                }
            });
        } else {
            error = 4;
            User.find({
                    enseignant: true
                }, function (err, result2) {
                    if (err) throw err;
                    if (result2.length != 0) {
                        res.render('enseignant/module', {module: '', enseignant: result2, error: error});
                    } else {
                        res.render('enseignant/module', {module: '', enseignant: '', error: error});
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

router.get('/:module', function (req, res) {
    Module.find({name: req.param('module')}, function (err, result) {
        if (err) throw err;
        res.render('enseignant/gestion_module', {module: result, error: error});
    });
});

router.post('/:module', function (req, res) {
    var notes = req.files.note;
    notes.mv('./public/images/upload/' + req.param('module') + '.jpg', function (err) {
        if (err) throw err;
        Module.find({name: req.param('module')}, function (err, result) {
            if (err) throw err;
            res.render('enseignant/gestion_module', {module: result, error: error});
        });
    });
});

module.exports = router;