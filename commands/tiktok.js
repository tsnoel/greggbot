const TikTokScraper = require('tiktok-scraper');
const Discord = require('discord.js');

exports.checkCommand = (msg) => {
    if (msg.author.bot) {
        return
    }

    const regex = /https:\/\/vm\.tiktok\.com\/[a-zA-Z0-9]{9}\//g;
    const urls = msg.content.match(regex);

    if (urls && !msg.author.bot) {
        urls.forEach(async (url) => {
            try {
                const videoMeta = await TikTokScraper.getVideoMeta(url);
                const exampleEmbed = new Discord.MessageEmbed()
	                .setColor('#ee1d52')
	                .setTitle(videoMeta.collector[0].text)
	                .setURL(url)
	                .setAuthor(`${videoMeta.collector[0].authorMeta.nickName}   @`
                        + `${videoMeta.collector[0].authorMeta.name}`,
                        videoMeta.collector[0].authorMeta.avatar)
	                .setDescription(`🎶 ${videoMeta.collector[0].musicMeta.musicName} - `
                        + `${videoMeta.collector[0].musicMeta.musicAuthor}\n`
                        + `⏱ ${videoMeta.collector[0].videoMeta.duration} seconds | `
                        + `📱${videoMeta.collector[0].videoMeta.width}x`
                        + `${videoMeta.collector[0].videoMeta.height}`)
	                .setThumbnail(videoMeta.collector[0].imageUrl)
                    .setFooter(new Date(videoMeta.collector[0].createTime * 1000).toLocaleString());

                    msg.channel.send(exampleEmbed);
            } catch (error) {
                console.log(error);
            }
        });
    }
}

exports.commands = {};
