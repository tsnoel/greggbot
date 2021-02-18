const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const pokedex = require('pokedex-promise-v2');
const pdex = new pokedex();
const adapter = new FileSync('pkmn.json');
const db = low(adapter);

getSpecies = async (num) => {
    const res = await pdex.getPokemonSpeciesByName(num);
    let info = {};
    info.color = res.color.name;

    let split = res.evolution_chain.url.split('/');
    split = split[split.length - 2];

    let evolves = await getEvolution(split);
    evolves = evolves.chain.evolves_to.map((e) => {
        let r = {};
        r.details = e.evolution_details;
        r.name = e.species.name;
        return r;
    });
    info.evolve = evolves;
    info.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${res.id}.png`;

    return info;
}

getEvolution = async (num) => {
    const res = await pdex.getEvolutionChainById(num);
    return res;
}

wild = async (msg) => {
    db.defaults({
        data: [],
    }).write();

    let pkmn = db.get('data').value();
    const datapkmn = [];

    pkmn.forEach(async (p) => {
        const name = p.name.toLowerCase();
        console.log(name);
        let q;
        try {   
            q = await getSpecies(name);
        } catch (e) {
            console.log(e);
            return;
        }
        datapkmn.push({...p, ...q});
        console.log(`${p.name}... done.`);
    });

    db.set('data', datapkmn).write();
}

wild();
