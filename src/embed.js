// Quacker 2.0
// SulphurDev
//
// embed.js
// General handler for embeds.

console.log("embed.js initilised")

const { EmbedBuilder } = require('discord.js')
const { guild } = require('./interaction')

const memberEmbed = new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle('Server member count:')
    .setURL('https://quack.robuxtrex.co.uk/commands/member-count')
    .setDescription(`${guild}`)

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
        { name: 'I did not join Quacker Support', value: 'If you did not join Quacker Support, please join it (run /support) and report it so we can fix the issue - we apoligise for any inconvenience!'}
)

const errorEmbed = new EmbedBuilder()
    .setColor(0xff0000)
    .setTitle('Error!')
    .setURL('https://quack.robuxtrex.co.uk/discord/error')
    .setDescription(`There was an error whilst executing this command!\n\nPlease refer to /support for Quacker support.`)

const supportEmbed = new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle('Quacker Official Support Server')
    .setURL('https://quack.robuxtrex.co.uk/commands/support')
    .setDescription(`Join Quacker Support here:\n\nhttps://discord.gg/Qb5yzH56Jz`)
//const helpPageOne = new EmbedBuilder()
//    .setColor(0x00ff00)
//    .setTitle('Quacker Help - Page 1')
//    .setURL('https://quack.robuxtrex.co.uk/commands/help')
//    .setDescription('Here at Quacker Support, you can get support for the Quacker bot, as well as joining or starting general conversations about it - you can even get tips for your own Discord bot!')
//    .setFields(
//        { name: '/help', value: 'Help is a command that shows you every single command, with a detailed description.' },
//        { name: '/kick', value: 'Kick a target member from your Discord server with an optional reason field.' },
//        { name: '/members', value: 'Find the member count of your Discord server!' },
//        { name: '/pong', value: 'Quacker will say pong... that\'s it!' },
//        { name: '/purge', value: 'Mass delete messages from a particular channel.' },
//        { value: 'You can also view our well-documented website by clicking the blue text when running a command!' }
//   ) 

module.exports = {
    quackEmbed,
    verifyEmbed,
    refreshEmbed,
    pongEmbed,
    onJoinEmbed,
    errorEmbed,
    supportEmbed,
    memberEmbed,
    // pageOne: helpPageOne,


}