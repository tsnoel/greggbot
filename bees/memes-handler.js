const Canvas = require('canvas');
const Discord = require('discord.js');

const config = require('../config.json');

exports.generate = (msg) => {
    const args = msg.content.split('"');
	
	// get top text
	var toptext=args[1];
	
	// get bottom text (if any)
	if ((args.length > 2) && (args[3].length > 0)) {
		var bottomtext=args[3];
	}
	else {
		var bottomtext=" ";
	}
	
	// get image
	var img = new Canvas.Image();
	img.src = msg.attachments.first().url;
	
	// draw image
	img.onload = function() { 
    	const canvas = Canvas.createCanvas(img.width, img.height);
		const ctx = canvas.getContext('2d');
    	ctx.drawImage(img,0,0);

	    // add text
	    var fontsize=(img.height / 10);
	    ctx.font = fontsize + 'px Impact';
	    ctx.textAlign = "center";

	    ctx.strokeStyle = 'black';
    	ctx.lineWidth = (fontsize / 8);
    	ctx.strokeText(toptext, (img.width / 2), (img.height / 8));
    	ctx.strokeText(bottomtext, (img.width / 2), (img.height - (img.height / 16)));

	    ctx.fillStyle = "white";
	    ctx.fillText(toptext, (img.width / 2), (img.height / 8));
	    ctx.fillText(bottomtext, (img.width / 2), (img.height - (img.height / 16)));
	
	    // stole this from the pokemon code
	    att = new Discord.MessageAttachment(canvas.toBuffer(), `hot_new_meme.png`);

	    msg.channel.send(config.greeting, att);
    }
}
