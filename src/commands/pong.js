const { SlashCommandBuilder } = require('discord.js')
const { pongEmbed } = require('../embed')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pong')
    .setDescription('Quack will reply with pong!'),
    async execute(interaction) {
        await interaction.reply({ embeds: [pongEmbed], ephemeral: true })
    }
}