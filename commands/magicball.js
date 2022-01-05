const config = require('../config.json');

exports.checkCommand = async (msg) => {
    if (msg.content.startsWith(`${config.prefix}magicball`)) {
	    const answers = [
            // affirmative answers
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            // non-committal answers
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            // negative answers
            'Don\'t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'
        ];

        msg.channel.send(answers[Math.floor(Math.random() * answers.length)]);
    }
}

exports.commands = {
    magicball: '```' +
        `\n${config.name} shakes a magic 8 ball and tells you the results.` +
        '\n```'
};
