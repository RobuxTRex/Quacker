// FINISHED!

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Quack will kick the selected member')
    .addUserOption(option =>
        option
            .setName('target')
            .setDescription('The target user you want to punish.')
            .setRequired(true) 
    )
    .addStringOption(option =>
        option
            .setName('reason')
            .setDescription('The reason for the given punishment.')
            .setRequired(false)
    ),
    async execute(interaction) {

        let kickTarget = interaction.options.getUser('target')
        let kickReason = interaction.options.getString('reason') ?? 'No reason provided'

        const member = interaction.options.getMember('target')

        let guild = interaction.guild.name

        const kickEmbed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle('Kick successful!')
            .setURL('https://quack.robuxtrex.co.uk/commands/kick')	
            .setDescription(`I have successfully kicked the target member.`)
            .addFields(
                { name: `Target:`, value: `${kickTarget}` },
                { name: `Reason:`, value: `${kickReason}` }
            )
            .setTimestamp()
        
        const kickDM = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle(`Uh oh!`)
            .setURL('https://quack.robuxtrex.co.uk/commands/kick')
            .setDescription(`You have been kicked from ${guild}!`)
            .addFields(
                { name: 'Server', value: `${guild}` },
                { name: 'Reason', value: `${kickReason}` },
                //{ name: 'Moderator', value: `${addModerator}` },
            )
            .setTimestamp()

        kickTarget.send({ embeds: [kickDM] }).catch(err => {
            return console.log(`Could not send kick message to ${kickTarget.name} because ${err}. Kick from ${guild} for reason: ${kickReason}`)
        })
        
        await interaction.reply({ embeds: [kickEmbed] })
        await member.kick()
    },
}