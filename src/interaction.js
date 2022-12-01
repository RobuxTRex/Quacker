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
            .setLabel('Verify!')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setLabel('More information...')
            .setStyle(ButtonStyle.Link)
            .setURL("https://quack.robuxtrex.co.uk/discord/verify")
    )

client.on('ready', client => {
    ( client.channels.cache.get('1047589319545737236')).send('Hello here!')
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