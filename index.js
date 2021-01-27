const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

const db = require('./helpers/db.js');

const tarot = require('./commands/tarot.js');
const pokemon = require('./commands/pokemon.js');
const mochibux = require('./commands/mochibux.js');
const bees = require('./commands/bees.js');

const commands = {
    ...mochibux.commands,
    ...pokemon.commands,
    ...bees.commands,
    ...tarot.commands
};

// === ON READY ===
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    db.initDB();
    config.hiddenCommands.forEach((e) => delete commands[e]); 
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
    if (!msg.content.startsWith(config.prefix) &&
        !msg.content.startsWith('<@')) {
        return;
    }

    if (msg.content.startsWith(`${config.prefix}help`)) {
	    const args = msg.content.split(' ');

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

    tarot.checkCommand(msg);

    pokemon.checkCommand(msg);

    mochibux.checkCommand(msg, client);

    bees.checkCommand(msg);
});

// === LOGIN ===
client.login(config.token);
