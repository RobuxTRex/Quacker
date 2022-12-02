const { SlashCommandBuilder } = require('discord.js')
const { memberEmbed } = require('../embed')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('membercount')
    .setDescription('Quack will tell you your Discord server\'s member count!'),
    async execute(interaction) {
        await interaction.reply({ embeds: [memberEmbed] })
    },
}