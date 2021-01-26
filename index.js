const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

const db = require('./helpers/db.js');

const pokemon = require('./commands/pokemon.js');
const mochibux = require('./commands/mochibux.js');
const bees = require('./commands/bees.js');

// === ON READY ===
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    db.initDB();
    client.user.setActivity(config.activity || 'Bot Games',
        { type: [
            'PLAYING',
            'STREAMING',
            'LISTENING',
            'WATCHING',
            'COMPETING'
        ][Math.floor((Math.random() * 5))] }
    );
});

// === ON MESSAGE ===
client.on('message', async (msg) => {
    if (msg.content.substring(0, 1) !== config.prefix &&
        msg.content.substring(0, 2) !== '<@') {
        return;
    }

    if (msg.content.startsWith(`${config.prefix}help`)) {
	    const args = msg.content.split(' ');
        const commands = {
            ...mochibux.commands,
            ...pokemon.commands,
            ...bees.commands
        };

	    //TODO: make command arrays into objects with applicable text
	    // create this logic block programmatically
	    if (Object.keys(commands).includes(args[1])) {
	        msg.channel.send(commands[args[1]]);
	    } else {
	        const joiner = `, ${config.prefix}`;

	        msg.channel.send(
                `${config.greeting} Try one of these commands.\n\`\`\`` +
	            `\n${config.prefix}${Object.keys(commands).join(joiner)}` +
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
