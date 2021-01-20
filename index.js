const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

const db = require('./db-handler.js');

const pokemon = require('./pokemon-handler.js');
const mochibux = require('./mochibux-handler.js');
const bees = require('./bees-handler.js');

// === ON READY ===
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    db.initDB();
    client.user.setActivity('Stinky Bot Games')
});

// === ON MESSAGE ===
client.on('message', async (msg) => {
    if (msg.content.substring(0, 1) !== config.prefix &&
        msg.content.substring(0, 2) !== '<@') {
        return;
    }

    if (msg.content.startsWith(`${config.prefix}help`)) {
	let args = msg.content.split(' ');
	
	if (args[1] === 'pokemon') {
	    msg.channel.send('```' +
	        '\n!pokemon <# of pokemon (1-6)> ' +
		'<max generation (1-8)> <detail level (1-2)>' +
		'\ndefaults: !pokemon 1 8 2' +
		'\n```');
	} else if (args[1] === 'jackbox') {
	    msg.channel.send('```' +
		'\n!jackbox<number of players>' +
		'\n e.x. "!jackbox8"' +
		'\n```');
	} else {
	    msg.channel.send('bork bork! Try one of these commands. ' +
	        '\n```' +
	        '\n!wild, !pokemon, !mochibux, !peepee, !bork, !wisdom, !jackbox' +
	        '\n```');
	}
    }

    if (msg.content.startsWith(`${config.prefix}wild`)) {
        try {
	    pokemon.wild(msg);
	} catch (e) {
	    console.log(e);
	}
    } else if (msg.content.startsWith(`${config.prefix}pokemon`)) {
        try {
	    await pokemon.team(msg);
	} catch (e) {
	    console.log(e);
	}
    }

    mochibux.checkCommand(msg, client);
    bees.checkCommand(msg);
});

// === LOGIN ===
client.login(config.token);
