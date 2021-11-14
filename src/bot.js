const Discord = require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");
const {Intents} = require("discord.js");
const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
//require("dotenv").config();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); 	// read JS file in commands folder 
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js')); 	// read JS file in events folder 

for (const file of commandFiles) {					// set command to client.command
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}
// OTA2ODMzMjA5Mzk5MDYyNTI4.YYeYPQ.87URDGlK2EkpSPbEyKlWWAj-Vus
// mongodb+srv://passa:ayxcrLxNw0aeTNmj@nong-songngarn.9wfyc.mongodb.net/BotDatabase?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://passa:ayxcrLxNw0aeTNmj@nong-songngarn.9wfyc.mongodb.net/BotDatabase?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log("Connected to the database");
}).catch((err) => {
	console.log(err);
});

client.login("OTA2ODMzMjA5Mzk5MDYyNTI4.YYeYPQ.87URDGlK2EkpSPbEyKlWWAj-Vus");
