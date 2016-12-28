var mongoose = require('mongoose');
var User = require('../model/user.js');
var Book = require('../model/book.js');
var formidable = require('formidable');
exports.showLogin = function(req, res) {
    res.render('login');
}
exports.doLogin = function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        User.find({
            'name': fields.name
        }, function(err, result) {
            console.log(result);
            if (err) {
                console.log(err);
                return;
            }
            if (result.length == 0) {
                res.send({
                    'flag': '0'
                });
            } else {
                if (result[0].pwd != fields.pwd) {
                    res.send({
                        'flag': '-1'
                    });
                } else {
                    req.session.login = true;
                    req.session.username = fields.name;
                    res.send({
                        'flag': '1'
                    });
                }
            }
        });
    });
}
exports.showIndex = function(req, res) {
    if (!req.session.login) {
        res.render('login');
    } else {
        res.render('index');
    }
}
exports.bookList = function(req, res) {
    if (!req.session.login) {
        res.render('login');
    } else {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields) {
            var page = parseInt(fields.page) || 1;
            var rows = parseInt(fields.rows) || 3;
            var total = 0;
            Book.count({}).exec(function(err, count) {
                total = count;
            });
            Book.find({})
                .sort('publishdate')
                .skip((page - 1) * rows)
                .limit(rows)
                .exec(function(err, result) {
                    res.send({
                        'total': total,
                        'rows': result
                    });
                });
        });
    }
}
exports.delete = function(req, res) {
    if (!req.session.username) {
        res.redirect('/login');
    } else {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields) {
            var id = mongoose.Types.ObjectId(fields.bid);
            Book.remove({
                '_id': id
            }, function(err) {
                if (err) {
                    console.log(err);
                    res.send(false);
                    return;
                } else {
                    res.send(true);
                }
            });
        });
    }
}
exports.saveOrUpdate = function(req, res) {
    if (!req.session.username) {
        res.redirect('/login');
    } else {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields) {
            var book = JSON.parse(fields.rowData);
            if (!book['_id']) {
                Book.create(book, function(err) {
                    if (err) {
                        console.log(err);
                        res.send(false);
                        return;
                    } else {
                        res.send(true);
                    }
                });
            } else {
                var id = mongoose.Types.ObjectId(book['_id']);
                Book.update({
                    '_id': id
                }, book, function(err) {
                    if (err) {
                        console.log(err);
                        res.send(false);
                        return;
                    } else {
                        res.send(true);
                    }
                });
            }
        });

    }
}
