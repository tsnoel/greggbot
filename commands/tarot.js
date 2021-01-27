const config = require('../config.json');
const trt = require('../handlers/tarot-handler.js');

exports.checkCommand = async (msg) => {
    if (msg.content.startsWith(`${config.prefix}fortune`)) {
        try {
            await trt.fortune(msg);
        } catch (e) {
            console.log(e);
        }
    }
};

exports.commands = {
    fortune: ''
};
