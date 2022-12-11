const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { refreshEmbed, verifyEmbed } = require('../embed') 
const { verifyInteractions } = require('../interaction')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('refresh')
    .setDescription('Quack will refresh the Verify embed.')
    .addChannelOption(option =>
        option
            .setName('channel')
            .setDescription('What channel would you like to refresh the embeds in?')
            .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {

        const sendChannel = interaction.options.getChannel('channel') ?? false

        if(sendChannel === false) {
            await interaction.reply({ embeds: [refreshEmbed], ephemeral: true })
            await interaction.followUp({ embeds: [verifyEmbed], components: [verifyInteractions] })

            return 1;
        }

        await interaction.reply({ embeds: [refreshEmbed], ephemeral: true })
        sendChannel.send({ embeds: [verifyEmbed], components: [verifyInteractions] })

        return 1;
    }
}