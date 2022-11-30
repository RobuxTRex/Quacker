const { EmbedBuilder } = require('discord.js')

const quackEmbed = new EmbedBuilder()
	.setColor(0x00ff00)
	.setTitle('Quack!')
	.setURL('https://quack.robuxtrex.co.uk/commands/quack')	
    .setDescription('I have been summoned to say QUACK!')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')

module.exports = {
    quackEmbed
}