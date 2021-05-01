const jackbox = require('../handlers/jackbox-handler.js');
const memes = require('../handlers/memes-handler.js');
const service = require('../helpers/mochAPI.js');
const config = require('../config.json');

exports.checkCommand = async (msg) => {
    if (msg.content === `${config.prefix}peepee`) {
        msg.channel.send('poopoo');
    } else if (msg.content === `${config.prefix}${config.ping}`) {
	const pings = await service.ping.fetchPings();

        msg.channel.send(pings[Math.floor(Math.random() * pings.length)].message);
    } else if (msg.content.startsWith(`${config.prefix}jackbox`)) {
        jackbox.jackbox(msg);
    } else if (msg.content.startsWith(`${config.prefix}meme`)) {
        try {
            memes.generate(msg);
        } catch (e) {
            console.log(e);
        }
    }
}

exports.commands = {
    peepee: '',
    bork: '',
    jackbox: '```' +
        '\n!jackbox<number of players>' +
        '\n e.x. "!jackbox8"' +
        '\n```',
    meme: '```' +
        '\n!meme "<top text>" "<bottom text (optional)>"' +
        '\n e.x. !meme "top text" "bottom text"' +
        '\n NOTE: You MUST also supply an attachment image.' +
        '\n```'
};
