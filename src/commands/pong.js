const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pong')
        .setDescription('Quacker will reply with pong; generally used as a debugging command.'),
    async execute(interaction) {
        await interaction.reply('Pong!')
    }
}