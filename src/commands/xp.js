//const target = interaction.options.getUser('user') ?? interaction.user;

//return interaction.reply(`${target.tag} has ${getBalance(target.id)}💰`);

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { getXP, level, nextLevel, nextReward, levelDifference } = require('../interaction')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('xp')
    .setDescription('Quack will give you the targetted user\'s XP.')
    .addUserOption(option =>
        option
            .setName('user')
            .setDescription('Target user to view the level information from.')
            .setRequired(false)
    ),
    async execute(interaction) {

        const defaultUser = interaction.user
        const targetUser = interaction.options.getUser('user') ?? defaultUser

        const embed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle(`${targetUser.tag}'s XP:`)
            .setURL('https://quack.robuxtrex.co.uk/commands/level')
            .setDescription(`User ${targetUser.tag}'s XP: ${getXP(targetUser.id)}!`)
            .addFields(
                { name: `Level`, data: level },
                { name: `Next Level`, data: `${nextLevel} (${levelDifference})` },
                { name: `Next Reward`, data: nextReward }
            )

        await interaction.reply({ embeds: [embed] })

        module.exports = {
            defaultUser: user
        }
    }
}