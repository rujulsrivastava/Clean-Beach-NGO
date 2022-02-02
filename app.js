var express = require('express');
var path = require('path'); var cookieParser = require('cookie-parser'); var logger = require('morgan');
var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users'); var open = require('open'); var bodyParser = require("body-parser"); const mongoose = require('mongoose'); mongoose.connect("mongodb://localhost:27017/signupdb", {
    useUnifiedTopology: true, useNewUrlParser: true
});
var db = mongoose.connection; db.on('error', console.log.bind(console, "Connection error")); db.once('open', function (callback) {
    console.log("Connection succeeded");
})
var app = express(); app.use(logger('dev')); app.use(express.json()); app.use(express.urlencoded({ extended: false })); app.use(cookieParser()); app.use(express.static(path.join(__dirname, 'public'))); app.use('/', indexRouter); app.use('/users', usersRouter); module.exports = app; app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signup', function (req, res) {
    var name = req.body.name; var email = req.body.email; var phone = req.body.phone; var event = req.body.event; var group = req.body.group; var time = req.body.time; var work = req.body.work; var data = {
        "name": name,
        "email": email,
        "phone": phone,
        "event": event,
        "group": group,
        "time": time,
        "work": work
    }
    db.collection('details').insertOne(data, function (err,
        collection) {
            if (err) throw err; console.log(data + "Record inserted Successfully");
    }); return res.redirect('signup_success.html');
})

