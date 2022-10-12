// Quack
// Discord.js v14
// bot.js
// src/bot.js
//
// Main Entry File

const { Client, GatewayIntentBits } = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const { token } = require('./info.json')

const { pingEmbed } = require('./embeds')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once('ready', () => {
    console.log("Quack is logging in...");
	console.log("Quack is now online!");
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	console.log("Interaction!")

	const { interactionName } = interaction;

	console.warn(interactionName)

	if (interactionName === 'pong') { // PONG COMMAND
		await interaction.reply('Pong!');
	} else if(interactionName === 'ping') { // PING COMMAND
        console.log(`Pinging ${interaction.options.getMentionable('username')}...`)
        await interaction.reply(`${interaction.options.getMentionable('username')}`);
		await interaction.followUp({ embeds: [pingEmbed] })
		console.log(`Successfully notified...`)
		await interaction.followUp({ content: `${interaction.options.getMentionable('username')} has successfully been pinged!`, ephemeral: true })
		await interaction.deleteReply()
		console.log(`Task completed - notified user.`)
    } else if(interactionName === 'echo') { // ECHO COMMAND
		const echoEmbed = new EmbedBuilder()
    .setColor(0x5e626e)
    .setDescription(`${interaction.options.getString('message')}`)
    .setAuthor({ name: `${interaction.user.username} says:`, iconURL: `https://cdn.discordapp.com/attachments/1018267029322617003/1018479530538700830/speech.png`});
		console.log(`Echoing '${interaction.options.getString('message')}'...`)
		await interaction.reply({ embeds: [echoEmbed] })
		console.log(`Echo of '${interaction.options.getString('message')}' was successful.`)
	} else if(interactionName === 'alert') { // EMBED TESTING COMMAND
		let msg = interaction.options.getString('message')
		if(msg === null) { msg = 'No message provided.'; }
		const alertEmbed = new EmbedBuilder()
    .setColor(0x5e626e)
    .setDescription('The alert has been sent successfully. Thank you for alerting staff - if there are no replies from the Staff Team within 30 minutes, please re-run this command.')
    .setAuthor({ name: `Alert Sent`, iconURL: `https://cdn.discordapp.com/attachments/1018212470306902017/1018266785117638766/yes.png` })
			.addFields(
				{ name: `Priority`, value: `${interaction.options.getString('priority')}` },
				{ name: `Message`, value: `${msg}`},
			);
		await interaction.reply({ embeds: [alertEmbed], ephemeral: true });
	}
})

client.login(token);