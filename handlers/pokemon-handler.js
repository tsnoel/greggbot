const Canvas = require('canvas');
const Discord = require('discord.js');

const p = require('pokedex-promise-v2');
const pokemon = new p();

getPokemon = async (num) => {
    const res = await pokemon.resource(num);
    return res;
}

async function stitchImages(images, names, types, gens) {
    const canvas = Canvas.createCanvas(96 * images.length, 120);
    const ctx = canvas.getContext('2d');

    for (i = 0; i < images.length; i++) {
        // Since the image takes time to load, you should await it
        // This uses the canvas dimensions to stretch the image onto the entire canvas
        ctx.drawImage(await Canvas.loadImage(images[i]), i * 96, 0);
	    ctx.fillStyle = '#ffffff';
        // TODO: Make a centered font and use it here. See meme-handler.
	    ctx.fillText(names[i], i * 96 + ((96- names[i].length * 5) /2), 96);
	    ctx.fillText(names[i], 1 + i * 96 + ((96- names[i].length * 5) /2), 96);

	    ctx.fillText(`(${types[i]})`, (i * 96) + ((96 - types[i].length * 5) / 2), 111);
    }

    // Use helpful Attachment class structure to process the file for you
    return new Discord.MessageAttachment(canvas.toBuffer(),
	`${images.length}-random-max-gen-${gens}-pokemon.png`)
}

exports.wild = async (msg) => {
    let pknum = Math.floor((Math.random() * 893) + 1);
    let pkmn = await getPokemon([`/api/v2/pokemon/${pknum}`]);

    msg.channel.send(`\`\`\`Wild ${pkmn[0].name} appeared!\`\`\``);

    if (pkmn[0].moves && pkmn[0].moves.length) {
        msg.channel.send(`\`\`\`Wild ${pkmn[0].name} used ` +
            `${pkmn[0].moves[Math.floor((Math.random() * pkmn[0].moves.length))].move.name}.` +
        `${['', '', '', ' It\'s not very effective.', ' It\'s super effective!', ' Critical hit!']
        [Math.floor((Math.random() * 6))]}\`\`\``);
    }
}

exports.team = async (msg) => {
    const maxpkmn = [151, 251, 386, 493, 649, 721, 809, 898];
    const args = msg.content.split(' ');

    const num = !args[1] ? 1 : parseInt(args[1]) > 6 ? 6 : parseInt(args[1] < 1) ? 1 : parseInt(args[1]);
    const gens = !args[2] ? 8 : parseInt(args[2]) > 8 ? 8 : parseInt(args[2] < 1) ? 1 : parseInt(args[2]);
    const level = !args[3] ? 2 : parseInt(args[3]) > 4 ? 4 : parseInt(args[3] < 1) ? 1 : parseInt(args[3]);

    let images = [];
    let names = [];
    let types = [];
    let text = '';
    let requests = [];
    let att = [];

    for (i = 0; i < num; i++) {
        let pknum = Math.floor((Math.random() * maxpkmn[gens - 1]) + 1);
	    requests.push(`/api/v2/pokemon/${pknum}`);
    }

    let pkmn = await getPokemon(requests);
 
    for (i = 0; i < num; i++) {
        text += `**${pkmn[i].name}** (${pkmn[i].types.map((m) => m.type.name).join(' / ')})${i === num - 1 ? '' : ', '}`;
	images.push(pkmn[i].sprites.front_default);
	names.push(pkmn[i].name);
	types.push(pkmn[i].types.map((m) => m.type.name).join(' / '));
    }

    if (level > 1) {
        att = await stitchImages(images, names, types, gens);
	text = '';
    }

    msg.channel.send(text, att);
}
