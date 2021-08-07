const data = require('./spells.json');
const spells = ["Mage Hand", "Vicious Mockery", "Healing Word", "Comprehend Languages", "Heroism", "Longstrider", "Tasha's Hideous Laughter"];
const res = [];

spells.forEach((s) => {
    res.push(data.find((d) => d.name === s));
});

console.log(res);
