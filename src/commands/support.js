const { SlashCommandBuilder } = require('discord.js')
const { supportEmbed } = require('../embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Gain access to quack\'s offical support server!'),
    async execute(interaction) {
        await interaction.reply({ embeds: [supportEmbed], ephemeral: true })
    }
}