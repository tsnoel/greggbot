const service = require('../helpers/mochAPI.js');
const config = require('../config.json');

exports.checkCommand = async (msg) => {
    if (msg.content === `${config.prefix}wisdom`) {
	const wisdoms = await service.wisdom.fetchWisdoms();

        msg.channel.send(wisdoms[Math.floor(Math.random() * wisdoms.length)].message);
    }
}

exports.commands = {
    wisdom: '```' +
        `\n${config.name} dispenses a useful piece of advice.` +
        '\n```'
};
