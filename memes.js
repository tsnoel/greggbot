const Canvas = require('canvas');
const Discord = require('discord.js');

const config = require('./config.json');

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
	var ctx = canvas.getContext('2d');
	var img = new Image();
	img.src = msg.attachments.first().url;
	
	// draw image
	ctx.drawImage(img,0,0);
	
	// add text
	ctx.font = 'Impact';
	ctx.fillText(toptext, 10, 10);
	ctx.fillText(bottomtext, 10, (img.height - (img.height / 4)));
	
	// stole this from the pokemon code
	att = new Discord.MessageAttachment(canvas.toBuffer(), `hot_new_meme.png`);
	
	msg.channel.send("bork!", att);
}
