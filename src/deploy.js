// Quacker 2.0
// SulphurDev
//
// deploy.js
// General handler for deployment of Slash Commands (application commands).

console.log("deploy.js initilised")

const { REST, Routes } = require('discord.js');
const { clientID, token } = require('../cred/config.json');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		let data = await rest.put(
			Routes.applicationCommands(clientID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();