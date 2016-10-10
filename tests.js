/**
 * Created by Jagon on 04.04.2015.
 */

var DB = require ('./DB');

var users = new mongoDB ('users');
users.insert({a : 'lasdfasdfasdf'});
users.find({a: 3}, function (data) {console.log (data)});