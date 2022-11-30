const { SlashCommandBuilder } = require('discord.js');
const { quackEmbed } = require('../embed')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quack')
        .setDescription('Quack!'),
    async execute() {
        channel.send({ embeds: [quackEmbed], empheral: true })
    }
}