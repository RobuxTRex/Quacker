const { SlashCommandBuilder } = require('discord.js')
const { pageOne, pageTwo } = require('../embed')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Learn all of Quack\'s commands!')
    .addStringOption(option =>
        option
            .setName('page')
            .setDescription('Select the page of which you would like to view.')
            .setRequired(true)
            .addChoices(
                { name: 'Page 1', value: 'page_one' },
                { name: 'Page 2', value: 'page_two'}
            )
    ),
    async execute(interaction) {
        const page = interaction.options.getString('page')

        if(page === "page_one" ) {
            await interaction.reply({ embeds: [pageOne] })
        } else {
            await interaction.reply({ embeds: [pageTwo] })
        }
    }
}