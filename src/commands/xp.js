//const target = interaction.options.getUser('user') ?? interaction.user;

//return interaction.reply(`${target.tag} has ${getBalance(target.id)}💰`);

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const prisma = require('../prisma')
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

        const dat = await prisma.user.findUnique({
            where: { id: targetUser.id },
        })

        if (!dat) return interaction.reply("This user does not exist on planet Discord!")

        let xp = dat.xp
        let level = Math.floor(xp/500)
        let lastLevelXp = xp/500
        let nextLevelXp = xp*1.65

        if(xp >= nextLevelXp) {
            lastLevelXp = xp
            nextLevelXp = xp*1.65
        }

        const levelDifference = nextLevelXp-xp
        console.log(levelDifference)
        console.log(lastLevelXp)
        console.log(nextLevelXp)

        const embed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle(`XP Progression`)
            .setURL('https://quack.robuxtrex.co.uk/commands/level')
            .setDescription(`User ${targetUser}'s level is ${level}, XP is ${xp} and needs ${levelDifference} more XP to level-up!\n\nUnfortunately, the levelling system is down, meaning you will not gain XP from messaging. You will recieve a DM when it is back up!`)
            .addFields(
                { name: `Progress`, value: `${xp}/${nextLevelXp}`, inline: true },
                { name: `Level`, value: `${level}` },
              //{ name: `Next Reward`, value: nextReward }
            )

        await interaction.reply({ embeds: [embed] })
    }
}