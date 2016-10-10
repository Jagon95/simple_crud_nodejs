var http = require('http');
var url = require('url');
var swig = require ('swig');
var dataBase = require("./dataBase");
var DB = require('./DB');
var express = require ("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongodb = require('mongodb');
var mongoose = require ('mongoose');
var app = express();
app.set ('port', 2030);

http.createServer (app).listen(app.get ("port"), function () {
    console.log ("Express listening on port " + app.get("port"));
});
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use (cookieParser ());
var cookieSession = require('cookie-session');
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}));
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: 'keyboard cat',
    store : new MongoStore({mongoose_connection: mongoose.connection})
}));

app.use ('/index', function (req, res) {
    res.send(swig.renderFile('index.tpl', {tasks: dataBase.allItem(), user: req.session.user}));
});
app.get ('/login', function (req, res) {
        res.send (swig.renderFile ('login.html'));
    }
);
app.post ('/login', function (req, res) {
    if (req.body.name && req.body.pass) {
        var users = DB ('users');
        users.find({name : req.body.name}, function (userData) {
            if (userData.length <= 0) {
                users.insert({name : req.body.name, pass : req.body.pass});
                req.session.user = req.body.name;
                res.writeHead(302, {"location" : "/index"});
                res.end ();
            }
            else {
                userData = userData [0];
                if (userData.pass == req.body.pass) {
                    req.session.user = userData.name;
                    res.writeHead(302, {"location" : "/index"});
                    res.end ();
                }
                else {
                    res.send (403, 'wrong password')
                }
            }
        })
    }
    else {
        res.writeHead (200);
        res.end('Error user info input');
    }
});
app.use ('/logout', function (req, res) {
    req.session.destroy();
    res.writeHead(302, {"location" : "/index"});
    res.end ();
});
app.get ("/new_note", function (req, res) {
    res.send (swig.renderFile ("editTask.tpl"));
});
app.post ('/new_note', function (req, res) {
    createTask (req, res);
});
app.get ('/update', function (req, res) {
    var reqData= url.parse(req.url, true);
    if (reqData.query.update) {
        var task = dataBase.getId (reqData.query.update);

        res.writeHead (200);
        res.end (swig.renderFile ("editTask.tpl", task));
    }
});
app.post ('/update', function (req, res) {
    var task = dataBase.getId (url.parse(req.url, true).query.update);
    createTask (req, res, task);
});
app.get ("/style.css", function (req, res) {
    res.writeHead (200);
    res.end (swig.renderFile ("style.css"));
});

app.get ('/delete', function (req, res) {
    var itemId = url.parse(req.url, true).query.delete;
    if (itemId) {
        dataBase.deleteItem(itemId, req.session.user);
        res.writeHead(302, {"location" : "/index"});
        res.end ();
    }
});


app.use (function (req, res) {
    res.writeHead(404);
    res.end("ERROR, BRO!");
});

function createTask (req, res, task) {
    //var post = qs.parse(body);
    if (req.body.name) {
        var newTask = {};
        newTask.name = req.body.name;
        newTask.tag = req.body.tag;
        newTask.author = req.session.user;
        if (task)
            newTask.id = task.id;
        dataBase.addItem(newTask);
    }
    res.writeHead(302, {"location" : "/index"});
    res.end();
}
