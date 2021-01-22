const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

const db = require('./db-handler.js');

const pokemon = require('./pokemon-handler.js');
const mochibux = require('./mochibux-handler.js');
const bees = require('./bees-commands.js');

// === ON READY ===
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    db.initDB();
    client.user.setActivity(config.activity || 'Bot Games')
});

// === ON MESSAGE ===
client.on('message', async (msg) => {
    if (msg.content.substring(0, 1) !== config.prefix &&
        msg.content.substring(0, 2) !== '<@') {
        return;
    }

    if (msg.content.startsWith(`${config.prefix}help`)) {
	    const args = msg.content.split(' ');

	    //TODO: make command arrays into objects with applicable text
	    // create this logic block programmatically
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
        } else if (args[1] === 'meme') {
            msg.channel.send('```' +
                '\n!meme "<top text>" "<bottom text (optional)>"' +
                '\n e.x. !meme "top text" "bottom text"' +
                '\n NOTE: You MUST also supply an attachment image.' +
                '\n```');
	    } else {
	        const joiner = `, ${config.prefix}`;

	        msg.channel.send('bork bork! Try one of these commands. ' +
	            '\n```' +
	            `\n${config.prefix}${mochibux.commands.concat(pokemon.commands.concat(bees.commands)).join(joiner)}` +
	            '\n```');
	    }
    }

    // TODO: add dice roller

    // TODO: add robo/cartoon voice

    pokemon.checkCommand(msg);

    mochibux.checkCommand(msg, client);

    bees.checkCommand(msg);
});

// === LOGIN ===
client.login(config.token);
