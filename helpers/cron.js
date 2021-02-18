const schedule = require('node-schedule');
const weather = require('weather-js');
const Discord = require('discord.js');

let client;

exports.start = (c) => {
    client = c;
    clock();
}
 
const clock = () => {
    const rule = new schedule.RecurrenceRule();
    rule.hour = 8;
    rule.minute = 30;
    rule.second = 0;

    const job = schedule.scheduleJob(rule, () => {
        const d = new Date();
        console.log(`PING! - ${d.getHours()}:${d.getMinutes() < 10 ? '0' : ''}` +
                `${d.getMinutes()}`);
        try {
            const result = weather.find(
                {search: 'Columbia, MD', degreeType: 'F'}, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }

                client.channels.cache.get('799664783548350524').send(
                    `bork! Good morning! It's ` +
                    `${d.getHours()}:${d.getMinutes() < 10 ? '0' : ''}` +
                    `${d.getMinutes()}.\nIt's ${result[0].current.temperature}°F` +
                    ` and ${result[0].current.skytext} in ${result[0].location.name}.`);
            });
        } catch (e) {
            console.log(e);
        }
    });
}
