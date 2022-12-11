// FINISHED

const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const prisma = require('../prisma')
const wait = require('node:timers/promises').setTimeout 

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
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {

        let amount = interaction.options.getNumber('amount')
        let revert = interaction.options.getBoolean('revert') ?? true
        let channel = interaction.options.getChannel('channel') ?? interaction.channel

        if(amount > 100) {
            amount = 100
        }

        const messages = await channel.bulkDelete(amount)

        for (const message of messages.values()) {
            let author = message.author.id
            let guildId = message.guild.id

            if(!message.author.bot) {
                const level = await prisma.user.upsert({
                    where: { id: author },
                    update: {
                        xp: { decrement: 5 }
                    },
                    create: {
                        id: author,
                        xp: 0,
                        guild: guildId,
                    }
                })
                if(level.xp < 0) {
                    const update = await prisma.user.update({
                        where: { id: author },
                        update: {
                            xp: 0
                        },
                        data: {
                            id: author,
                            xp: 0,
                            guild: guildId,
                        }
                    })
                }
            }
        }

        const purgeEmbed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle('Purge Successful!')
            .setURL('https://quack.robuxtrex.co.uk/discord/error')
            .setDescription(`Purged ${amount} in ${channel} (revert xp: ${revert}) successfully!`)

        await interaction.reply({ embeds: [purgeEmbed] })
        await wait(1000)
        await interaction.deleteReply()
    }
}