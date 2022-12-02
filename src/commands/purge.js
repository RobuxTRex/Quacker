const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

const embed = new EmbedBuilder()
    .setColor(0x00f00)
    .setTitle('Quacker Official Support Server')
    .setURL('https://quack.robuxtrex.co.uk/commands/support')
    .setDescription(`Join Quacker Support here:\n\nhttps://discord.gg/Qb5yzH56Jz`)

function deleteMessages(amount) {
     return new Promise(resolve => {
        if (amount > 100) throw new Error('You can\'t delete more than 100 messages at a time.');
        setTimeout(() => resolve('Deleted 100 messages.'), 2000);
    });
}
    

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Quack will purge the selected amount of messages.')
        .addNumberOption(option =>
            option
                .setName('amount')
                .setDescription('Select the target amount of messages to purge.')
                .setRequired(true)
        )
        .addBooleanOption(option =>
            option
                .setName('revert')
                .setDescription('Should Quack revert the XP from the target messages\' authors?')
                .setRequired(false)
        )
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('Select the target channel for the purge.')
                .setRequired(false)
            )
        ,
    async execute(interaction) {
        await interaction.reply({ embeds: [embed], ephemeral: true })

        deleteMessages(5)
        

    }
}