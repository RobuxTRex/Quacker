const { Client, SlashCommandBuilder, GatewayIntentBits } = require('discord.js')
const { refreshEmbed, verifyEmbed } = require('../embed') 
const { verifyInteractions } = require('../interaction')

const client = new Client({ intents: [ GatewayIntentBits.Guilds ]})

module.exports = {
    data: new SlashCommandBuilder()
    .setName('refresh')
    .setDescription('Quack will refresh the Verify embed.'),
    async execute(interaction) {

        const sendChannel = client.channels.cache.get(channel => channel.id === '1047589319545737236')

        await interaction.reply({ embeds: [refreshEmbed], ephemeral: true })
        await interaction.followUp({ embeds: [verifyEmbed], components: [verifyInteractions] })

        async () => {
            let fetched
            do {
                fetched = await channel.fetchMessages({limit: 100})
                message.channel.bulkDelete(fetched)
            }
            while(fetched.size >= 2)
        };
    }
}