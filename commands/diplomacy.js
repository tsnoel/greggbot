const db = require('../helpers/db.js');
const config = require('../config.json');
const Discord = require('discord.js');

exports.checkCommand = (msg) => {
    if (msg.content.startsWith(`${config.prefix}order`)) {
        let order = msg.content.split(' ');
        order.shift();
        order = order.join(' ');

        db.setOrder(msg.author.id, order);

        msg.channel.send(`${config.greeting} Order recieved!\n` +
            'Use the !order command again to overwrite these ' +
            'orders before they\'re due.');
    } else if (msg.content.startsWith(`${config.prefix}secret-diplomacy-test`)) {
        const orders = db.getOrders();
        const time = db.getDiplomacyTime();

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor(time.season === 'Fall' ? '#D37B6F' : '#7DBD94')
            .setTitle(`Orders for ${time.season} ${time.year}`)
            .setAuthor((`From the omnipotent paws of ${config.name}, god of war`).toUpperCase())
            .setFooter(new Date().toLocaleString());

        Object.values(orders).forEach((o) => {
            exampleEmbed.addField(`${o.diplosona} (${o.name})`, o.order || 'No orders recieved.', false);
        });

        msg.channel.send(exampleEmbed);

        db.incrementDiplomacyTime();
        db.clearOrders();
    } else if (msg.content.startsWith(`${config.prefix}diplomacy-status`)) {
        const orders = db.getOrders();
        const time = db.getDiplomacyTime();

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor(time.season === 'Fall' ? '#D37B6F' : '#7DBD94')
            .setTitle(`Order Status for ${time.season} ${time.year}`)
            .setAuthor((`From the omnipotent paws of ${config.name}, god of war`).toUpperCase())
            .setFooter(new Date().toLocaleString());

        Object.values(orders).forEach((o) => {
            exampleEmbed.addField(`${o.diplosona} (${o.name})`, o.order === '' ? '❌ Not Submitted' : '✅ Submitted', true);
        });

        msg.channel.send(exampleEmbed);
    } else if (msg.content.startsWith(`${config.prefix}diplomacy-order`)) {
        const orders = db.getOrder(msg);
        const time = db.getDiplomacyTime();

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor(time.season === 'Fall' ? '#D37B6F' : '#7DBD94')
            .setTitle(`${msg.author.username}'s Order for ${time.season} ${time.year}`)
            .setDescription(orders || 'No orders recieved.')
            .setAuthor((`From the omnipotent paws of ${config.name}, god of war`).toUpperCase())
            .setFooter(new Date().toLocaleString());

        msg.channel.send(exampleEmbed);
    }
}

exports.commands = {
    order: '```' +
        `\n${config.name} takes a diplomacy order.` +
        '\n```',
    'diplomacy-status': '```' +
        `\n${config.name} shows who has and has not submitted orders for the current round.` +
        '\n```',
    'diplomacy-order': '```' +
        `\n${config.name} reads your current diplomacy order back to you.` +
        '\n```'
};
