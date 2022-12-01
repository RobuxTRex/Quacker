// Quacker 2.0
// SulphurDev
//
// embed.js
// General handler for embeds.

console.log("embed.js initilised")

const { EmbedBuilder } = require('discord.js')
const { guild } = require('./interaction')

const quackEmbed = new EmbedBuilder()
	.setColor(0x00ff00)
	.setTitle('Quack!')
	.setURL('https://quack.robuxtrex.co.uk/commands/quack')	
    .setDescription('I have been summoned to say QUACK!')

const verifyEmbed = new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle('Verify your account!')
    .setURL('https://quack.robuxtrex.co.uk/discord/verify')
    .setDescription(`We use the verification feature to combat bots and spamming in Quacker Support!\n\n By pressing 'Verify!', you agree to all of our rules and Discord's TOS.`)

const refreshEmbed = new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle('Refreshed successfully!')
    .setURL('https://quack.robuxtrex.co.uk/commands/refresh')
    .setDescription('Refreshed the Verify message, interactions and embeds.')

const pongEmbed = new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle('Pong!')
    .setDescription('I have been summoned to tell you this.')
    .setURL('https://quack.robuxtrex.co.uk/commands/pong')

const onJoinEmbed = new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle('Thank you for joining Quacker Support!')
    .setURL('https://quack.robuxtrex.co.uk/discord/join-dm')
    .setDescription('Here at Quacker Support, you can get support for the Quacker bot, as well as joining or starting general conversations about it - you can even get tips for your own Discord bot!')
    .setFields(
        { name: 'I did not join Quacker Support', value: 'If you did not join Quacker Support, please join it and report it so we can fix the issue - we apoligise for any inconvenience!'}
    )

const memberEmbed = new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle('Server member count:')
    .setURL('https://quack.robuxtrex.co.uk/commands/member-count')
    .setDescription(`${guild}`)

module.exports = {
    quackEmbed,
    verifyEmbed,
    refreshEmbed,
    pongEmbed,
    onJoinEmbed,
    memberEmbed,
}