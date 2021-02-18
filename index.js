const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

const db = require('./helpers/db.js');
const cron = require('./helpers/cron.js');

const tarot = require('./commands/tarot.js');
const dnd = require('./commands/dnd.js');
const wisdom = require('./commands/wisdom.js');
const pokemon = require('./commands/pokemon.js');
const mochibux = require('./commands/mochibux.js');
const bees = require('./commands/bees.js');
const tiktok = require('./commands/tiktok.js');

const commands = {
    ...mochibux.commands,
    ...pokemon.commands,
    ...bees.commands,
    ...tarot.commands,
    ...wisdom.commands,
    ...tiktok.commands,
    ...dnd.commands
};

// === ON READY ===
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    db.initDB(config.ping);
    cron.start(client);
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
    tiktok.checkCommand(msg);

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

    wisdom.checkCommand(msg);

    tarot.checkCommand(msg);

    dnd.checkCommand(msg);

    pokemon.checkCommand(msg);

    mochibux.checkCommand(msg, client);

    bees.checkCommand(msg);
});

// === LOGIN ===
client.login(config.token);
