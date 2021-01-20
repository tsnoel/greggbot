const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const pkmnHandler = require('./pokemon-handler.js')
 
const adapter = new FileSync('db.json');
const db = low(adapter);
 
exports.initDB = () => {
    db.defaults({ users: {} }).write();
}

exports.name = (id, name) => {
    let users = db.get('users').value();

    if (!users[id]) {
	users[id] = {};
    }

    users[id].name = name;

    db.set('users', users).write();
}

exports.getPoints = (id) => {
    let users = db.get('users').value();

    if (!users[id]) {
	return `That user isn't registered with the MochiBux program at this time.`;
    }

    return `${users[id].name} has ${users[id].points || 0} MochiBux`;
}

exports.points = (id, amount) => {
    let users = db.get('users').value();

    if (!users[id]) {
	users[id] = {};
    }

    users[id].points = users[id].points ? users[id].points + amount : amount;

    // Set user data
    db.set('users', users).write();
    return users[id].points;
}

exports.traits = (id, trait) => {
    let users = db.get('users');
    users[id].traits = users[id].traits ? users[id].traits : [];
    let traitNum = users[id].traits.findIndex((t) => t === trait);

    if (traitNum === -1) {
        users[id].traits.push(trait);
        db.set('users', users).write();
        return 'add';
    } else {
        users.splice(traitNum, 1);
        db.set('users', users).write();
        return 'sub';
    }
}

exports.pokemon = (id, name) => { 
    let users = db.get('users');
    let valid = pkmnHandler.getPokemon(name);

    users[id].pokemon = name;
 
    // Set user data
    db.set('users', users).write();
}
