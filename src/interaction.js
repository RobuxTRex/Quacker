// Quacker 2.0
// SulphurDev
//
// interaction.js
// General handler for interactions, like buttons or onJoinEvents.

console.log("interaction.js initilised")

const { Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, GatewayIntentBits, TextChannel } = require('discord.js')
const { verifyEmbed } = require('./embed')

const client = new Client({ intents: [ GatewayIntentBits.Guilds ]})

const verifyInteractions = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('verify')
            .setLabel('Verify your account!')
            .setStyle(ButtonStyle.Primary)
    )

client.on('ready', client => {
    ( client.channels.cache.get('1047589319545737236')).send('Hello here!')
})

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isButton()) return;

    const interactionName = interaction.interactionName
    
    if (interactionName === 'verify') {

        let role = message.guild.roles.find(r => r.id === "1047563966559293480")
        let verifyRole = message.guild.roles.find(r => r.id === "1047581450385494026")
        let member = client.users.cache.find(user => user.id)

        member.roles.add(role)
        member.roles.remove(verifyRole)

        await verifyInteractions.setStyle(ButtonStyle.Success)
        await verifyInteractions.setLabel('Successfully verified!')
    }
})

client.on('message', message => {
	guildID = message.guild.id
	guild = client.guildID.member

    client.channels.get('1047589319545737236').send()

    module.exports = guild
})

module.exports = {
    verifyInteractions,
}