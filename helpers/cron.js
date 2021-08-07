const schedule = require('node-schedule');
const weather = require('weather-js');
const Discord = require('discord.js');
const config = require('../config.json');

let client;

exports.start = (c) => {
    client = c;
    clock();

    Object.keys(config.birthdays).forEach((user) => {
        birthday(
            config.birthdays[user].date,
            config.birthdays[user].month,
            user
        );
    });
}

/*const friday = () => {
    const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [5];
    rule.hour = 8;
    rule.minute = 0;
    rule.second = 0;

    const job = schedule.scheduleJob(rule, () => {
        client.channels.cache.get('799664783548350524').send(
            'https://youtu.be/iCFOcqsnc9Y');
    });
}*/

const birthday = (date, month, user) => {
    const rule = new schedule.RecurrenceRule();
    rule.month = month - 1;
    rule.date = date;
    rule.hour = 12;
    rule.minute = 0;
    rule.second = 0;
    rule.tz = 'America/New_York';

    const job = schedule.scheduleJob(rule, () => {
        client.channels.cache.get('799415611477196871')
            .send(`🎂 Happy Birthday ${user.length === 18 ? '<@' + user + '>' : user}! 🎂`);
    });
}
 
const clock = () => {
    const rule = new schedule.RecurrenceRule();
    rule.hour = 6;
    rule.minute = 0;
    rule.second = 0;
    rule.tz = 'America/New_York';

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
                    'bork! Good morning! It\'s ' +
                    `${d.getHours()}:${d.getMinutes() < 10 ? '0' : ''}` +
                    `${d.getMinutes()}.\nIt's ${result[0].current.temperature}°F` +
                    `${result[0].current.temperature === '69' ? ' (nice!)' : ''}` +
                    ` and ${result[0].current.skytext} in ${result[0].location.name}.\n` +
                    `Today will be ${forecast.skytextday} with a low of ` +
                    `${forecast.low}°F` +
                    `${forecast.low === '69' ? ' (nice!)' : ''}` +
                    ` and a high of ${forecast.high}°F` +
                    `${forecast.high === '69' ? ' (nice!).' : '.'}`);
            });
        } catch (e) {
            console.log(e);
        }
    });
}
