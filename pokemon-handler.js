const p = require('pokedex-promise-v2');
const pokemon = new p();

async function getPokemon(num) {
    return await pokemon.resource(num);
}

exports.wild = async (msg) => {
    let pknum = Math.floor((Math.random() * 893) + 1);
    let pkmn = await getPokemon([`/api/v2/pokemon/${pknum}`]);

    msg.channel.send(`\`\`\`Wild ${pkmn[0].name} appeared!\`\`\``);
    msg.channel.send(`\`\`\`Wild ${pkmn[0].name} used ` +
        `${pkmn[0].moves[Math.floor((Math.random() * pkmn[0].moves.length))].move.name}.` +
	`${['', '', '', ' It\'s not very effective.', ' It\'s super effective!', ' Critical hit!']
	[Math.floor((Math.random() * 6))]}\`\`\``);
}

exports.team = async (msg) => {
    let maxpkmn = [151, 251, 386, 493, 649, 721, 809, 898];
    let args = msg.content.split(' ');
    let num = !args[1] ? 1 : parseInt(args[1]) > 6 ? 6 : parseInt(args[1] < 1) ? 1 : parseInt(args[1]);
    let gens = !args[2] ? 8 : parseInt(args[2]) > 8 ? 8 : parseInt(args[2] < 1) ? 1 : parseInt(args[2]);
    let level = !args[3] ? 2 : parseInt(args[3]) > 4 ? 4 : parseInt(args[3] < 1) ? 1 : parseInt(args[3]);
    let requests = [];

    for (i = 0; i < num; i++) {
        let pknum = Math.floor((Math.random() * maxpkmn[gens - 1]) + 1);
	requests.push(`/api/v2/pokemon/${pknum}`);
    }

    let pkmn = await getPokemon(requests);
 
    for (i = 0; i < num; i++) {
        msg.channel.send(`**${pkmn[i].name}** ` +
	    `(${pkmn[i].types.map((m) => m.type.name).join(' / ')})`, 
	    {files: level === 1 ? [] : [pkmn[i].sprites.front_default]});
    }
}

exports.getPokemon = getPokemon;
