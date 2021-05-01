const schedule = require('node-schedule');
const weather = require('weather-js');
const Discord = require('discord.js');
const config = require('../config.json');

let client;

exports.start = (c) => {
    client = c;
    clock();
    friday();
}

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
