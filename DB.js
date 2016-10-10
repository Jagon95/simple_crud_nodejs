var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/CRUD_app';
var users = 'users';

DB = function (DBname) {
    this.DBname = DBname;
    this.insert = function (data, callback) {
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            db.collection(DBname).insert(data, function (err) {
                assert.equal(null, err);
                db.close ();
                if (callback) callback ()
            })
        });
    };
    this.find = function (selector, callback) {
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            var elem =  db.collection(DBname).find(selector);
            elem.toArray(function (err, data) {
                assert.equal(null, err);
                db.close ();
                if (callback) callback (data)
            })
        });
    };
    this.remove = function (selector, callback) {
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            db.collection(DBname).remove (selector, function () {
                db.close ();
                if (callback) callback ()
            })
        })
    }
};


module.exports = function (DBname) {
    return new DB (DBname)
};