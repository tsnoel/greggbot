const service = require('../helpers/mochAPI.js');
const config = require('../config.json');

function stripID(id) {
    return id.replace(/[!@<>+-\s\n\t\r]/g, '');
}

exports.checkCommand = async (msg, client) => {
    const regexId = /<@!*[0-9]{18}>[ \t\r\n]*(\++|--)/g;
    const ids = msg.content.match(regexId);
    if (ids && !msg.author.bot) {
        ids.forEach(async (i) => {
            const id = stripID(i);
            let points;

            if (msg.author.id === id) {
                if (i.includes('++')) {
                    msg.channel.send('😒');
                } else {
                    msg.channel.send('🤨');
                }

                return;
            }

            try {
                points = await service.mochibux.fetchMochibux(id);
            } catch(e) {
                console.log(e);
                msg.channel.send('Who?');
                return;
            }

            try {
                points = await service.mochibux.updateMochibux(id, {
		    points: i.includes('++') ? points.points + 1 : points.points - 1 });
            } catch(e) {
                console.log(e);
                return;
            }

            msg.channel.send(`${i.replace(/[+-\s\n\t\r]/g, '')} ` +
	        `now has ${points.points} MochiBux!`);
        });
    } else if (msg.content.startsWith(`${config.prefix}mochibux`)) {
        const args = msg.content.trim().split(' ');
	const id = !args[1] ? msg.author.id : stripID(args[1]);

	let res;
	    
	try {
	    res = await service.mochibux.fetchMochibux(id);
	} catch {
	    msg.channel.send(`${config.greeting} Invalid user!`);
	    return;
	}

        msg.channel.send(
	    `${!args[1] ? 'You have' : args[1].replace(/[+-\s\n\t\r]/g, '') + ' has'}` +
	    ` ${res.points} MochiBux!`);
    }
}

exports.commands = {
    mochibux: '```' +
        'Check a user\'s MochiBux balance.' +
        '\n```'
};
