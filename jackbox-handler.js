    const games = [
	"Bomb Corp. (Party Pack 2)",
	"Bidiots (Party Pack 2)",
	"Blather ‘Round (Party Pack 7)",
	"Fakin’ It (Party Pack 3)",
	"Role Models (Party Pack 6)",
	"Zeeple Dome (Party Pack 5)",
	"Monster Seeking Monster (Party Pack 4)",
	"Champ’d Up (Party Pack 7)",
	"Civic Doodle (Party Pack 4)",
	"Dictionarium (Party Pack 6)",
	"Drawful 2 (Standalone Game)",
	"Earwax (Party Pack 2)",
	"Fibbage 2 (Party Pack 2)",
	"Fibbage 3 (Party Pack 4)",
	"Guesspionage (Party Pack 3)",
	"Joke Boat (Party Pack 6)",
	"Mad Verse City (Party Pack 5)",
	"Patently Stupid (Party Pack 5)",
	"Quiplash 2 (Party Pack 3)",
	"Quiplash 3 (Party Pack 7)",
	"Quiplash XL (Party Pack 2)",
	"Split the Room (Party Pack 5)",
	"Survive the Internet (Party Pack 4)",
	"Talking Points (Party Pack 7)",
	"Tee K.O. (Party Pack 3)",
	"The Devils and the Details (Party Pack 7)",
	"Trivia Murder Party (Party Pack 3)",
	"Trivia Murder Party 2 (Party Pack 6)",
	"You Don’t Know Jack: Full Stream (Party Pack 5)",
	"Push The Button (Party Pack 6)",
	"Bracketeering (Party Pack 4)"
    ];

exports.jackbox = (message) => {
    if (message.content.length > 8) {
	var numplayers = parseInt(message.content.substr(8));

	if (numplayers < 5) {
	    var game = Math.floor(Math.random() * games.length);
	} else if (numplayers < 7) {
	    var game = (Math.floor(Math.random() * (games.length - 1))) + 1;
	} else if (numplayers < 8) {
	    var game = (Math.floor(Math.random() * (games.length - 6))) + 6;
	} else if (numplayers < 9) {
	    var game = (Math.floor(Math.random() * (games.length - 7))) + 7;
	} else if (numplayers < 11) {
	    var game = (Math.floor(Math.random() * 2)) + (games.length - 2);
	} else if (numplayers < 17) {
	    var game = games.length-1;
	} else {
	    var game = 99;
	    message.channel.send("That's too many players for Jackbox :( Try 16 or less.");
	}

    } else {
	var game = Math.floor(Math.random() * games.length);
    }

    if (game < 99) {
	message.channel.send("You should play: " + games[game]);
    }
}
