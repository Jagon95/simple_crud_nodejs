var DB = require('./DB');

var tasksDB = DB ('tasks');
    tasksDB.find({}, function (userData) {
    userData.forEach(function (value, index) {
        data.tasks.push(value)
    })
});

data = {tasks : [],
    lastId : 0};

function newId () {
    return data.lastId++;
}

function getId (id) {
    for (var i = 0; i < data.tasks.length; i++)
        if (data.tasks [i].id == id) {
            return data.tasks [i];
        }
    return null;
}

exports.addItem = function (item) {
    if (item.name && item.tag) {
        if (getId (item.id)) {
            var  oldItem = getId(item.id);
            oldItem.name = item.name;
            oldItem.tag = item.tag;
            oldItem.author = item.author;
            return;
        }
        else if (! item.id)
            item.id = newId();
        data.tasks.push(item);;
        tasksDB.insert(item)
    }
};

exports.getId = getId;

exports.deleteItem = function (id, user) {
    if (!user)
        return;
    for (var i = 0; i < data.tasks.length; i++)
        if ((data.tasks [i].id == id) && (data.tasks [i].author == user)) {
            data.tasks.splice(i, 1);
            tasksDB.remove({id: parseInt (id)});;
            return;
        }
};

exports.allItem = function () {
    return data.tasks;
};