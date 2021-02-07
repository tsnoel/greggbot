const Canvas = require('canvas');
const Discord = require('discord.js');

const t = require('tarot-deck');

getReading = () => {
    const cards = [];

    while(cards.length < 3) {
        const card = t.drawCard({reversedChance: 0.4});

        if (!cards.find(e => e.name === card.name)) {
            cards.push(card);
        }
    }

    return cards;
}

async function stitchImages(msg, reading) {
    const width = 320 * reading.length + 100;
    const height = 910;

    const date = new Date();
    const m = date.toLocaleString('default', { month: 'long' });
    const d = date.getUTCDate();
    const y = date.getUTCFullYear();
    const sub = ['Past', 'Present', 'Future'];
    const ranks = {page: 11, knight: 12, queen: 13, king: 14};

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    let offset = 16;

    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.lineWidth = 2;

    const header = '~ FROM THE MYSTIC PAWS OF THE AMAZING GREGGBOT ~'
    ctx.font = '16px Arial';
    ctx.strokeText(header, width / 2, offset);
    ctx.fillText(header, width / 2, offset);
    offset += 48;

    const title = `${msg.author.username}'s Tarot Reading`;
    ctx.font = 'bold 40px Arial';
    ctx.strokeText(title, width / 2, offset);
    ctx.fillText(title, width / 2, offset);
    offset += 32;

    const title_date = `${m} ${d}, ${y}`;
    ctx.font = '16px Arial';
    ctx.strokeText(title_date, width / 2, offset);
    ctx.fillText(title_date, width / 2, offset);
    offset += 16;

    for (i = 0; i < reading.length; i++) {
        const x = i * 320 + (i + 1) * 25;

        ctx.save();

        if (reading[i].reversed) {
            ctx.translate(canvas.width/2,canvas.height/2);
            ctx.rotate(Math.PI);
            ctx.translate(-canvas.width/2, -canvas.height/2);
        }

        // Since the image takes time to load, you should await it
        try {
            ctx.drawImage(
                await Canvas.loadImage(
                    `/home/pi/tarot/${reading[i].suit}` +
                    (Object.keys(ranks).includes(reading[i].rank) ?
                        ranks[reading[i].rank] :
                        reading[i].rank < 10 ?
                            '0' + reading[i].rank :
                            reading[i].rank) +
                    '.jpg'
                ), reading[i].reversed ? canvas.width - x - 320 : x,
                reading[i].reversed ? offset + 65 : offset
            );
        } catch (e) {
            console.log(e)
        };

        ctx.restore();

        ctx.font = 'bold 30px Arial';
        ctx.strokeText(sub[i], x + 160, offset + 650);
        ctx.fillText(sub[i], x + 160, offset + 650);

        ctx.font = '25px Arial';
        ctx.strokeText(reading[i].name, x + 160, offset + 680);
        ctx.fillText(reading[i].name, x + 160, offset + 680);

        if (reading[i].reversed) {
            ctx.fillStyle = 'pink';
            ctx.font = '15px Arial';
            ctx.strokeText('REVERSED', x + 160, offset + 700);
            ctx.fillText('REVERSED', x + 160, offset + 700);
            ctx.fillStyle = 'white';
            ctx.font = '25px Arial';
        }

        let text = reading[i].reversed ?
            reading[i].meanings.shadow :
            reading[i].meanings.light;

        text = text[Math.floor(Math.random() * text.length)];
        const lines = [];

        while (text.length) {
            let q, j;

    	    for (
                q = text.length;
                ctx.measureText(text.substr(0, q)).width > 320;
                q--
            );
    
    	    let result = text.substr(0, q);
    
    	    if (q !== text.length) {
    		    for (
                    j = 0;
                    result.indexOf(' ', j) !== -1;
                    j = result.indexOf(' ', j) + 1
                );
            }
    	
    	    lines.push(result.substr(0, j || result.length));
    	    text = text.substr(lines[lines.length - 1].length, text.length);
        }

        ctx.font = lines.length > 3 ? 'italic 15px Arial' : 'italic 25px Arial';
        for (let a = 0; a < lines.length; a++) {
            ctx.strokeText(lines[a], x + 160, offset + 730 + (lines.length > 3 ? 20 : 30) * a);
            ctx.fillText(lines[a], x + 160, offset + 730 + (lines.length > 3 ? 20 : 30) * a);
        }
    }

    // Use helpful Attachment class structure to process the file for you
    return new Discord.MessageAttachment(canvas.toBuffer(),
	`${msg.author.username}'s-reading-${m}-${d}-${y}.png`)
}

exports.fortune = async (msg) => {
    const att = await stitchImages(msg, getReading());

    msg.channel.send('', att);
}
