const dnd = require('../handlers/dnd-handler.js');
const config = require('../config.json');

exports.checkCommand = async (msg) => {
    if (msg.content.startsWith(`${config.prefix}5e-spell`)) {
        try {
            await dnd.spell(msg);
        } catch (e) {
            console.log(e);
        }
    } else if (msg.content.startsWith(`${config.prefix}5e-character`)) {
        try {
            await dnd.characterGen(msg);
        } catch (e) {
            console.log(e);
        }
    }
};

exports.commands = {
    '5e-spell': 'Generate a random dnd 5e spell',
    '5e-character': 'Generate a random level 0 commoner',
};
