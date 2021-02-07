const db = require('../helpers/db.js');
const config = require('../config.json');

function stripID(id) {
    return id.replace(/[!@<>+-\s]/g, '');
}

exports.checkCommand = async (msg, client) => {
    if (msg.content.startsWith('<@') &&
        (msg.content.substring(msg.content.length-3) === '>++' ||
        msg.content.substring(msg.content.length-3) === '>--') ||
        (msg.content.substring(msg.content.length-4) === '> ++' ||
        msg.content.substring(msg.content.length-4) === '> --')) {
        const id = stripID(msg.content);
        let user
          , points;

        if (msg.author.id === id) {
            if (msg.content.substring(msg.content.length-1) === '+') {
                msg.channel.send('😒');
            } else {
                msg.channel.send('🤨');
            }

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

        msg.channel.send(`${user.username} now has ${points} MochiBux` +
            `${user.bot ? '. I hope I can spend it on cheese.' : ''}`);
    } else if (msg.content.startsWith(`${config.prefix}mochibux`)) {
        const args = msg.content.trim().split(' ');

        if (!args[1]) {
            msg.channel.send(db.getPoints(msg.author.id));
            return;
        }

	    const id = stripID(args[1]);
        msg.channel.send(db.getPoints(id));
    }
}

exports.commands = {
    mochibux: '```' +
        'Write something about MochiBux here.' +
        '\n```'
};
