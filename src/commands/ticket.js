const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Need support? Make a ticket by running this command!')
    .addStringOption(option =>
        option
            .setName('reason')
            .setDescription('The reason for creating the ticket.')
            .setRequired(false)
    ),
    async execute(interaction) {

        const guild = interaction.guild
        
        if(!guild.category.cache.get("Tickets")) {
            guild.category.create({
                name: 'Tickets',
            })
        }

        const categoryId = guild.category.cache.get("Tickets")
        guild.channels.create({
            name: `${interaction.author.name}`,
            type: ChannelType.GuildText,
            parent: categoryId.id
        })

        const ticketCreatedEmbed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle('Created ticket successfully!')
            .setURL('https://quack.robuxtrex.co.uk/commands/ticket')
            .setDescription(`I have successfully made a ticket! Go check out ${interaction.guild.channels.cache.get()}`)

        await interaction.reply({ embeds: [pongEmbed], ephemeral: true })
    }
}