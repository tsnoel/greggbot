const db = require('./db-handler.js');
const config = require('./config.json');

function stripID(id) {
    return id.replace(/[!@<>+-]/g, '');
}

exports.checkCommand = async (msg, client) => {
    if (msg.content.substring(0, 2) === '<@' &&
        (msg.content.substring(msg.content.length-3) === '>++' ||
        msg.content.substring(msg.content.length-3) === '>--')) {
        const id = stripID(msg.content);
        let user
          , points;

        if (msg.author.id === id) {
            msg.channel.send('😒');
            return;
        }

        try {
            user = await client.users.fetch(id);
        } catch(e) {
            console.log(e);
            msg.channel.send('Who?');
            return;
        }

        db.name(id, user.username);

        try {
            points = db.points(id, msg.content.substring(msg.content.length-1) === '+' ? 1 : -1);
        } catch(e) {
            console.log(e);
            return;
        }

        msg.channel.send(`${user.username} now has ${points} MochiBux`);
    } else if (msg.content.startsWith(`${config.prefix}mochibux`)) {
        const arg = msg.content.trim().split(' ');
	const id = stripID(arg[1]);
        msg.channel.send(db.getPoints(id));
    }
}

exports.commands = ['mochibux'];
