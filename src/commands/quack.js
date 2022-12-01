const { SlashCommandBuilder } = require('discord.js')
const { quackEmbed } = require('../embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quack')
        .setDescription('Quack will reply with Quack!'),
    async execute(interaction) {
        await interaction.reply({ embeds: [quackEmbed], ephemeral: true })
    }
}