const { SlashCommandBuilder } = require('discord.js')
const { memberEmbed } = require('../embed')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('membercount')
    .setDescription('Quack will tell you your Discord server\'s member count!'),
    async execute(interaction) {
        guild.members.fetch({ withPresences: true }).then(async fetchedMembers => {
            const memberCount = fetchedMembers
            const totalOnline = fetchedMembers.filter(member => member.presence?.status === 'online');
            const totalOffline = fetchedMembers.filter(member => member.presence?.status === 'offline');
            const totalIdle = fetchedMembers.filter(member => member.presence?.status === 'idle');
        
            const memberEmbed = new EmbedBuilder()
                .setColor(0x00ff00)
                .setTitle('Server member count:')
                .setURL('https://quack.robuxtrex.co.uk/commands/member-count')
                .setDescription(`${fetchedMembers}`)
                .addFields(
                    { name: 'Online Members', data: `${totalOnline}` },
                    { name: 'Offline Members', data: `${totalOffline}` },
                    { name: 'Idle Members', data: `${totalIdle}` },
                )

            await interaction.reply({ embeds: [memberEmbed] })
        });
    },
}