const db = require('../helpers/db.js');
const config = require('../config.json');

const wisdoms = db.getWisdoms();

exports.checkCommand = (msg) => {
    if (msg.content.startsWith(`${config.prefix}manage-wisdom`)) {
        if (!msg.content.split('"')[1]) {
            const wis = db.getWisdoms();
            const t = '```\n' + wis.join('\n') + '\n```'

            msg.channel.send(`Here are all of my wisdoms:\n${t}`);

            return;
        }

        if (db.setWisdom(msg.content.split('"')[1]) > -1) {
            msg.channel.send('That wasn\'s a good wisdom anyway.');
        } else {
            msg.channel.send('That\'s a good wisdom.');
        }
    } else if (msg.content === `${config.prefix}wisdom`) {
        msg.channel.send(wisdoms[Math.floor(Math.random() * wisdoms.length)]);
    }
}

exports.commands = {
    wisdom: '```' +
        `\n${config.name} dispenses a useful piece of advice.` +
        '\n```',
    'manage-wisdom': '```' +
        `\nAdd, remove, or list advice from ${config.name}'s repertoire.` +
        `\n\nCOMMAND: ${config.prefix}manage-wisdom "<text>"` +
        `\nEXAMPLE: ${config.prefix}manage-wisdom ` +
        '"If your ball is too big for your mouth, it\'s not yours."' +
        '\nNOTE: If text isn\'t provided, then all advice will be listed.' +
        '\n      If text already exists it will be removed, otherwise it will be added.' +
        '\n```'
};
