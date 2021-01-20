const jackbox = require('./jackbox-handler.js');
const config = require('./config.json');

const borks = [
    'bork bork', 'bork!', 'bork bork', 'bork bork bork',
    'börk börk', 'bork?', 'bork!!', 'hawawa', 'bork bork'
];

const wisdoms = [
    'If your ball is too big for your mouth, it\'s not yours.',
    'When one door closes, choose a nearby wall and bash it in with brute force.'
];

exports.checkCommand = (msg) => {
    if (msg.content === `${config.prefix}peepee`) {
        msg.channel.send('poopoo');
    } else if (msg.content === `${config.prefix}bork`) {
        msg.channel.send(borks[Math.floor(Math.random() * borks.length)]);
    } else if (msg.content === `${config.prefix}wisdom`) {
        msg.channel.send(wisdoms[Math.floor(Math.random() * wisdoms.length)]);
    } else if (msg.content.substr(0,8) === '!jackbox') {
        jackbox.jackbox(msg);
    }
}
