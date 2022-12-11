// Quacker 2.0
// SulphurDev
//
// interaction.js
// General handler for interactions, like buttons or onJoinEvents.

console.log("interaction.js initilised")
const prisma = require('./prisma')

const { Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, GatewayIntentBits, TextChannel, Collection } = require('discord.js')
const { token } = require('../cred/config.json')
const { verifyEmbed } = require('./embed')
// const { Users, CurrencyShop } = require('./dbObjects.js');
const { user } = require('./commands/xp')

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers ]})
const currency = new Collection()

client.on(Events.InteractionCreate, async interaction => {

	if(!interaction.isButton()) return;

	const command = interaction.customId
    const member = interaction.member

    console.log(command)

	console.log(`${member.name} clicked the ${command} button`)
	
	if(command === 'verify') {
		const role = "1047563966559293480"
        const verify = "1047581450385494026"
        member.roles.add(role)
        console.log(role)
        member.roles.remove(verify)
        console.log(verify)
        interaction.deferUpdate()
	}
})

const verifyInteractions = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('verify')
            .setLabel('Verify!')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setLabel('More information...')
            .setStyle(ButtonStyle.Link)
            .setURL("https://quack.robuxtrex.co.uk/discord/verify")
    )

client.login(token)