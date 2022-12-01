// Quacker 2.0
// SulphurDev
//
// bot.js
// Entry point for the bot.

console.log("bot.js initilised")

const fs = require('node:fs');
const path = require('node:path')
const { Client, Collection, Events, GatewayIntentBits, ActivityType } = require('discord.js')

const { onJoinEmbed } = require('./embed')

const { token } = require('../config.json'); // If you are forking for your own bot, please create YOUR OWN config.json and enter your token in there.
                                             // DO NOT FORGET TO USE .GITIGNORE

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const client = new Client({ intents: [ GatewayIntentBits.Guilds ]})

client.commands = new Collection();

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on('guildMemberAdd', member => {
	let verify = client.guild.roles.find(r => r.id === "1047581450385494026")
	let memb = member.id
	let guild = guild.id
	member.roles.add(verify)

	if (guild === "1047559461553848431") {
		memb.send({ embeds: [onJoinEmbed] })
	}
})

client.once(Events.ClientReady, c => {
    console.log(`Quacker is now online; logged in as ${c.user.tag}`)

	client.user.setPresence({
		activities: [
		  { name: `${client.guilds.cache.size} Discord servers`, type: ActivityType.Watching },
		],
		status: "dnd",
	  });
})

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

	console.log(`${interaction.user.username} ran command ${command}`);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})

client.on(Events.InteractionCreate, async interaction => {
	if(!interaction.isButton()) return;

	const command = interaction.client.interaction.name

	console.log(`${interaction.user.name} clicked the ${command} button`)
	
	if(command === 'verify') {
		console.log("clicked!")
	}
})

client.login(token)