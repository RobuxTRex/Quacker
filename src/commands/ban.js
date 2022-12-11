const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const prisma = require('../prisma')
const ms = require('ms')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Quack will ban the targetted user!')
    .addUserOption(option =>
        option
            .setName('target')
            .setDescription("The target user of which will be banned.")
            .setRequired(true)
    )
    .addStringOption(option =>
        option
            .setName('reason')
            .setDescription('The reason of which the target user is being banned for.')
            .setRequired(false)
    )
    .addStringOption(option =>
        option
            .setName('duration')
            .setDescription("The duration of the ban in seconds.")
            .setRequired(false)    
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {

        const targetUser = interaction.options.getUser('target')
        const banReason = interaction.options.getString('reason') ?? 'No reason provided.'
        const banDuration = interaction.options.getString('duration') ?? '69 years'
        const punDuration = ms(banDuration, { long: true } )

        let guild = interaction.guild.name

        const ban = await prisma.user.create({
            where: { id: targetUser.id },
            
        })

        const banEmbed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle('Ban Successful!')
            .setURL('https://quack.robuxtrex.co.uk/commands/ban')
            .setDescription(`The user ${targetUser} has been banned from ${guild} for ${duration}!`)
        const banDMEmbed = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle('Uh oh!')
            .setURL('https://quack.robuxtrex.co.uk/commands/ban')
            .setDescription(`You have been banned from ${guild}!`)
            .addFields(
                { name: 'Server', value: `${guild}` },
                { name: 'Reason', value: `${banReason}` },
                { name: 'Duration', value: `${duration}`}
            )
            .setFooter({ text: `If the duration is set to something along '69 years', you ban is permanent!` })
            .setTimestamp()
        
        kickTarget.send({ embeds: [banDMEmbed] }).catch(err => {
            return console.log(`Could not send kick message to ${kickTarget.name} because ${err}. Kick from ${guild} for reason: ${kickReason}`)
        })
            
        await interaction.reply({ embeds: [banEmbed] })
        await targetUser.ban({ duration: punDuration, reason: banReason })
    }
}