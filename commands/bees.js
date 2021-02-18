const jackbox = require('../handlers/jackbox-handler.js');
const memes = require('../handlers/memes-handler.js');
const db = require('../helpers/db.js');
const config = require('../config.json');

const borks = db.getPings();

exports.checkCommand = (msg) => {
    if (msg.content === `${config.prefix}peepee`) {
        msg.channel.send('poopoo');
    } else if (msg.content === `${config.prefix}${config.ping}`) {
        msg.channel.send(borks[Math.floor(Math.random() * borks.length)]);
    } else if (msg.content.substr(0,8) === '!jackbox') {
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
