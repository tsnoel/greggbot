const Discord = require('discord.js');
const _ = require('lodash');

const spells = require('../assets/dnd/spells.json');
const occupations = require('../assets/dnd/occupations.json');
const flaws = require('../assets/dnd/flaws.json');
const traits = require('../assets/dnd/traits.json');
const ideals = require('../assets/dnd/ideals.json');
const bonds = require('../assets/dnd/bonds.json');
const equipment = require('../assets/dnd/equipment.json');
const names = require('../assets/dnd/names.json');

const languages = [
    'Dwarvish', 'Elvish', 'Giant', 'Gnomish',
    'Goblin', 'Halfling', 'Orc'
];

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
        'STR': {name: 'Strength', emoji: '💪'},
        'DEX': {name: 'Dexterity', emoji: '🎯'},
        'CON': {name: 'Constitution', emoji: '🥥'},
        'INT': {name: 'Intelligence', emoji: '🧠'},
        'WIS': {name: 'Wisdom', emoji: '☝️'},
        'CHA': {name: 'Charisma', emoji: '🗣'}
    };

    const proficiency = 2;
    const goodSaves = _.sampleSize(Object.keys(abilities), 2);

    Object.keys(abilities).forEach((a) => {
        abilities[a].mod = _.sample([-2, -1, -1, 0, 0, 0, 0, 1, 1, 2]);
        abilities[a].val = 10 + (2 * abilities[a].mod) + 1;
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

    const occupation = _.sample(Object.keys(occupations.data));
    const alignment = [
        _.sample(['Lawful', 'Neutral', 'Chaotic']),
        _.sample(['Good', 'Neutral'])
    ];
    const ideal = _.sample(ideals.data.filter((i) =>
        [alignment[0], alignment[1], 'Any'].includes(i[1])));
    const hd = _.sample([4, 6, 8, 10]);

    const aMod = Math.floor((Math.random() * 20) + 1) + Math.floor((Math.random() * 20) + 1);
    const hMod = Math.floor((Math.random() * 10) + 1) + Math.floor((Math.random() * 10) + 1);
    const wMod = hMod * (Math.floor((Math.random() * 4) + 1) + Math.floor((Math.random() * 4) + 1));

    let exampleEmbed = new Discord.MessageEmbed()
        .setTitle(`${name || _.sample(names.first) + ' ' + _.sample(names.last)}`)
        .setColor('#' + Math.floor(Math.random()*16777215).toString(16))
        .setAuthor(`${msg.author.username}'s Character`, msg.author.avatarURL())
        .setDescription(
            '👤 **Bio** 👤\n' +
            `**- Class & Level:** Townsperson 0\n` +
            `**- Race:** Human\n` +
            `**- Age:** ${15 + aMod}\n` +
            `**- Height:** ${Math.floor((56 + hMod)/12)}'${Math.floor((56 + hMod)%12)}"\n` +
            `**- Weight:** ${110 + wMod}lbs.\n` +
            `**- Alignment:** ${alignment.join(' ')}\n` +
            `**- Languages: ** ${abilities.INT.mod > 0 ? ['Common', ..._.sampleSize(languages, abilities.INT.mod)].join(', ') : 'Common'}\n` +
            `**- Occupation:** ${occupation}\n> _${occupations.data[occupation]}_\n` +
            '\n' +
            '😃 **Personality** 😃\n' +
            `**- Trait:** ${_.sample(traits.data)}\n` +
            `**- Ideal:** ${ideal[0]}\n` +
            `**- Bond:** ${_.sample(bonds.data)}\n` +
            `**- Flaw:** ${_.sample(flaws.data)}\n` +
            '\n' +
            '📝 **Ability Scores** 📝');

    Object.keys(abilities).forEach((a) => {
        exampleEmbed.addField(`${abilities[a].emoji} ` +
            `**${abilities[a].name}** (${a})`,
            `**⏤ Score:** ${abilities[a].val}\n` +
            `**⏤ Modifier:** ${abilities[a].mod > 0 ? '+' : ''}${abilities[a].mod}\n` +
            `${abilities[a].good ? '☑️ ' : '◻️ '} **Save:** ` +
            `${abilities[a].save > 0 ? '+' : ''}${abilities[a].save}`,
            true);
    });

    exampleEmbed.addField('Armor Class', 10 + abilities.DEX.mod, true);
    exampleEmbed.addField('Initiative',
        `${abilities.DEX.mod > 0 ? '+' : ''}${abilities.DEX.mod}`, true);
    exampleEmbed.addField('Speed', _.sample([25, 30, 30, 30, 35]), true);
    exampleEmbed.addField('Hit Points', hd + abilities.CON.mod, true);
    exampleEmbed.addField('Hit Dice', `1d${hd}`, true);
    exampleEmbed.addField('Proficiency', `+${proficiency}`, true);
    exampleEmbed.addField('Inspiration', 0, true);
    exampleEmbed.addField('Passive Perception', 10 + skills.Perception.val, true);
    exampleEmbed.addField('\u200B', '\u200B', true);
    let temp = '';

    Object.keys(skills).forEach((s) => {
        temp +=
            `${skills[s].good ? '☑ ' : '◻ '}` +
            `${abilities[skills[s].ability].emoji} **${s}:**` +
            ` ${skills[s].val > 0 ? '+' : ''}${skills[s].val}\n`;

        if (s === 'History') {
            exampleEmbed.addField('✨ Skills ✨', temp, true);
            temp = '';
        } else if (s === 'Medicine' || s === 'Persuasion') {
            exampleEmbed.addField('\u200B', temp, true);
            temp = '';
        }
    });

    exampleEmbed.addField('🎒 **Equipment** 🎒', _.sampleSize(equipment.data, 3).join('\n'), false);

    try {
        msg.channel.send(exampleEmbed);
    } catch (e) {
        console.log(e);
    }
}
