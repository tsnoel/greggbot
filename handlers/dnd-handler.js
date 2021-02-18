const Discord = require('discord.js');
const _ = require('lodash');

const spells = require('../assets/dnd/spells.json');

const spellIcons = {
    Necromancy: {
        icon: 'https://media-waterdeep.cursecdn.com/attachments/2/720/necromancy.png',
        color: '#a7f179'
    },
    Abjuration: {
        icon: 'https://media-waterdeep.cursecdn.com/attachments/2/707/abjuration.png',
        color: '#7ac4f3'
    },
    Evocation: {
        icon: 'https://media-waterdeep.cursecdn.com/attachments/2/703/evocation.png',
        color: '#9a3b31'
    },
    Conjuration: {
        icon: 'https://media-waterdeep.cursecdn.com/attachments/2/708/conjuration.png',
        color: '#eeaa3e'
    },
    Transmutation: {
        icon: 'https://media-waterdeep.cursecdn.com/attachments/2/722/transmutation.png',
        color: '#c1803e'
    },
    Enchantment: {
        icon: 'https://media-waterdeep.cursecdn.com/attachments/2/702/enchantment.png',
        color: '#cd8bc7'
    },
    Divination: {
        icon: 'https://media-waterdeep.cursecdn.com/attachments/2/709/divination.png',
        color: '#9ebfd2'
    },
    Illusion: {
        icon: 'https://media-waterdeep.cursecdn.com/attachments/2/704/illusion.png',
        color: '#d6b1fe'
    }
};

formatText = (t) => {
    const f = [];
    t.split('_').forEach((o) => {
        f.push(o.charAt(0).toUpperCase() + o.slice(1));
    });
    return f.join(' ');
};

exports.spell = async (msg) => {
    let m = msg.content.split(' ');
    m.shift();
    m = m.join(' ');
    m = spells.find((s) => (m || ' ').toLowerCase() === s.name.toLowerCase());
    const spell = m ? m : spells[Math.floor((Math.random() * spells.length))];

    let exampleEmbed = new Discord.MessageEmbed()
        .setColor(spellIcons[spell.school].color)
        .setTitle(spell.name)
        .setAuthor(`${spell.level} `
            + `∙ ${spell.school}`,
            spellIcons[spell.school].icon)
        .setDescription(`${spell.desc.substring(0, 2048)}`);

    Object.keys(spell).forEach((key) => {
        if (key !== 'level' &&
            key !== 'school' &&
            key !== 'level_int' &&
            key !== 'name' &&
            key !== 'desc') {
            exampleEmbed.addField(formatText(key), spell[key], true);
        }
    });

    try {
        msg.channel.send(exampleEmbed);
    } catch (e) {
        console.log(e);
    }
}

exports.characterGen = (msg) => {
    let abilities = {
        'STR': {}, 'DEX': {}, 'CON': {},
        'INT': {}, 'WIS': {}, 'CHA': {}
    };

    const proficiency = 2;
    const goodSaves = _.sampleSize(Object.keys(abilities), 2);

    Object.keys(abilities).forEach((a) => {
        abilities[a].mod = Math.floor((Math.random() * 3) - 1);
        abilities[a].val = 10 + (2 * abilities[a].mod);
        abilities[a].good = goodSaves.includes(a);
        abilities[a].save = abilities[a].mod + (abilities[a].good ? proficiency : 0);
    });

    let skills = {
        'Athletics': {ability: 'STR'},
        'Acrobatics': {ability: 'DEX'},
        'Sleight of Hand': {ability: 'DEX'},
        'Stealth': {ability: 'DEX'},
        'Arcana': {ability: 'INT'},
        'History': {ability: 'INT'},
        'Investigation': {ability: 'INT'},
        'Nature': {ability: 'INT'},
        'Religion': {ability: 'INT'},
        'Animal Handling': {ability: 'WIS'},
        'Insight': {ability: 'WIS'},
        'Medicine': {ability: 'WIS'},
        'Perception': {ability: 'WIS'},
        'Survival': {ability: 'WIS'},
        'Deception': {ability: 'CHA'},
        'Intimidation': {ability: 'CHA'},
        'Performance': {ability: 'CHA'},
        'Persuasion': {ability: 'CHA'}
    };

    const goodSkills = _.sampleSize(Object.keys(skills), 5);

    Object.keys(skills).forEach((s) => {
        skills[s].good = goodSkills.includes(s);
        skills[s].val = abilities[skills[s].ability].mod
            + (skills[s].good ? proficiency : 0);
    });

    let name = msg.content.split(' ');
    name.shift();
    name = name.join(' ') || '';

    let exampleEmbed = new Discord.MessageEmbed()
        .setTitle(`${name}`)
        .setAuthor(`${msg.author.username}'s Character`, msg.author.avatarURL());

    Object.keys(abilities).forEach((a) => {
        exampleEmbed.addField(a,
            `Value: ${abilities[a].val}\n` +
            `Mod: ${abilities[a].mod > 0 ? '+' : ''}${abilities[a].mod}\n` +
            `Save: ${abilities[a].good ? '✅ ' : ''}` +
            `${abilities[a].save > 0 ? '+' : ''}${abilities[a].save}`,
            true);
    });

    Object.keys(skills).forEach((s) => {
        exampleEmbed.addField(s,
            `${skills[s].good ? '✅ ' : ''}` +
            ` ${skills[s].val > 0 ? '+' : ''}${skills[s].val}` +
            ` ${skills[s].ability}`,
            true);
    });

    try {
        msg.channel.send(exampleEmbed);
    } catch (e) {
        console.log(e);
    }
}
