const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const pkmnHandler = require('../handlers/pokemon-handler.js')
 
const adapter = new FileSync('db.json');
const db = low(adapter);
 
exports.initDB = (ping = 'ping') => {
    db.defaults({
        users: {},
        wisdoms: ['If your ball is too big for your mouth, it\'s not yours.'],
        pings: [ping]
    }).write();
}

exports.name = (id, name) => {
    let users = db.get('users').value();

    if (!users[id]) {
	    users[id] = {};
    }

    users[id].name = name;

    db.set('users', users).write();
}

exports.avatar = (id, avatar) => {
    let users = db.get('users').value();

    if (!users[id]) {
        users[id] = {};
    }

    users[id].avatar = avatar;

    db.set('users', users).write();
}

/* exports.clearOrders = () => {
    let users = db.get('users').value();

    Object.keys(users).forEach((u) => {
        if (users[u].diplomacy) {
            users[u].order = '';
        }
    });

    db.set('users', users).write();
}

exports.getOrders = () => {
    let users = db.get('users').value();
    let temp = {};

    Object.keys(users).forEach((u) => {
        if (users[u].diplomacy) {
            temp[u] = {};
            temp[u].name = users[u].name;
            temp[u].order = users[u].order;
            temp[u].diplosona = users[u].diplosona;
        }
    });

    return temp;
}

exports.getOrder = (msg) => {
    let users = db.get('users').value();
    let temp = {};

    if (users[msg.author.id]) { //&& users[msg.author.id].diplomacy) {
        return users[msg.author.id].order || 'No orders recieved.';
    }

    return 'You\'re not a registered diplomacy player.';
}

exports.setOrder = (id, order) => {
    let users = db.get('users').value();

    if (!users[id]) {
        users[id] = {};
    }

    users[id].order = order;

    db.set('users', users).write();
}

exports.getDiplomacyTime = () => {
    return db.get('diplomacy').value();
}

exports.incrementDiplomacyTime = () => {
    let diplomacy = db.get('diplomacy').value();

    if (diplomacy.season === 'Fall') {
        diplomacy.year += 1;
        diplomacy.season = 'Spring';
    } else {
        diplomacy.season = 'Fall';
    }

    db.set('diplomacy', diplomacy).write();
} */

exports.getWisdoms = () => {
    return db.get('wisdoms').value();
}

exports.setWisdom = (wisdom) => {
    let wisdoms = db.get('wisdoms').value();
    let index = wisdoms.indexOf(wisdom);

    if (index === -1) {
        wisdoms.push(wisdom);
    } else {
        wisdoms.splice(index, 1);
    }

    try {
        db.set('wisdoms', wisdoms).write();
    } catch (e) {
        console.log(e);
    }

    return index;
}

exports.getPings = () => {
    return db.get('pings').value();
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

// ======================
// ======= UNUSED =======
// ======================
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

// ======================
// ======= UNUSED =======
// ======================
exports.pokemon = (id, name) => { 
    let users = db.get('users');
    let valid = pkmnHandler.getPokemon(name);

    users[id].pokemon = name;
 
    // Set user data
    db.set('users', users).write();
}
