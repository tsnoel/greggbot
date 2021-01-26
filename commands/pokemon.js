const config = require('../config.json');
const pkmn = require('../handlers/pokemon-handler.js');

exports.checkCommand = async (msg) => {
    if (msg.content.startsWith(`${config.prefix}wild`)) {
        try {
            await pkmn.wild(msg);
        } catch (e) {
            console.log(e);
        }

        return true;
    } else if (msg.content.startsWith(`${config.prefix}pokemon`)) {
        try {
            await pkmn.team(msg);
        } catch (e) {
            console.log(e);
        }

        return true;
    }

    return false;
};

exports.commands = {
    wild: '',
    pokemon: '```' +
        '\n!pokemon <# of pokemon (1-6)> ' +
        '<max generation (1-8)> <detail level (1-2)>' +
        '\ndefaults: !pokemon 1 8 2' +
        '\n```'
};
