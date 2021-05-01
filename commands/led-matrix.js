const exec = require('ssh-exec');

const service = require('../helpers/mochAPI.js');
const config = require('../config.json');

const cmdMap = {
    'cat-spin': 'bash cat.sh',
    'party-parrot': 'bash party.sh',
    'clear': ''
};

function stripCommand(msg) {
    return msg.replace(/!matrix[\s\n\t\r]*/g, '');
}

exports.checkCommand = async (msg) => {
    if (msg.content.startsWith(`${config.prefix}matrix`)) {
	const cmd = stripCommand(msg.content);

	if (Object.keys(cmdMap).find((m) => m === cmd)) {
	    try {
	        exec(`bash stop.sh; ${cmdMap[cmd]}`, config.ledMatrixCreds);
	    } catch (e) { console.log(e); }

	    msg.channel.send(`${config.greeting} Matrix set to ${cmd}!`);
	} else {
	    msg.channel.send('Try one of these commands: ' +
	    	`${Object.keys(cmdMap).join(', ')}`);
	}
    }
}

exports.commands = {
    matrix: '```' +
        'Set the decorative led matrix in Tim\'s media room.' +
	' I may regret this command.' +
        '\n```'
};
