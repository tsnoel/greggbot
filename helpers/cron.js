const schedule = require('node-schedule');
const weather = require('weather-js');
const Discord = require('discord.js');
const db = require('../helpers/db.js');
const config = require('../config.json');

let client;

exports.start = (c) => {
    client = c;
    clock();
    friday();
}

/* const diplomacy = () => {
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [1, 4];
    rule.hour = 19;
    rule.minute = 0;
    rule.second = 0;

    const job = schedule.scheduleJob(rule, () => {
        try {
            const orders = db.getOrders();
            const time = db.getDiplomacyTime();

            const exampleEmbed = new Discord.MessageEmbed()
                .setColor(time.season === 'Fall' ? '#D37B6F' : '#7DBD94')
                .setTitle(`Orders for ${time.season} ${time.year}`)
                .setAuthor((`From the omnipotent paws of ${config.name}, god of war`).toUpperCase())
                .setFooter(new Date().toLocaleString());

            Object.values(orders).forEach((o) => {
                exampleEmbed.addField(`${o.diplosona} (${o.name})`, o.order, false);
            });

            client.channels.cache.get('806677482367221821').send(exampleEmbed);

            db.incrementDiplomacyTime();
            db.clearOrders();
        } catch (e) {
            console.log(e);
        }
    });
} */

const friday = () => {
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [5];
    rule.hour = 8;
    rule.minute = 0;
    rule.second = 0;

    const job = schedule.scheduleJob(rule, () => {
        client.channels.cache.get('799664783548350524').send(
            'https://youtu.be/iCFOcqsnc9Y');
    });
}
 
const clock = () => {
    const rule = new schedule.RecurrenceRule();
    rule.hour = 7;
    rule.minute = 30;
    rule.second = 0;

    const job = schedule.scheduleJob(rule, () => {
        const d = new Date();
        try {
            const result = weather.find(
                {search: 'Columbia, MD', degreeType: 'F'}, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }

                const day = result[0].current.day;
                const forecast = result[0].forecast.find((f) => f.day === day);

                client.channels.cache.get('799664783548350524').send(
                    `bork! Good morning! It's ` +
                    `${d.getHours()}:${d.getMinutes() < 10 ? '0' : ''}` +
                    `${d.getMinutes()}.\nIt's ${result[0].current.temperature}°F` +
                    ` and ${result[0].current.skytext} in ${result[0].location.name}.\n` +
                    `Today will be ${forecast.skytextday} with a low of ` +
                    `${forecast.low}°F and a high of ${forecast.high}°F.`);
            });
        } catch (e) {
            console.log(e);
        }
    });
}
