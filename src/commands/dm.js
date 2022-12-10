const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Client, GatewayIntentBits } = require('discord.js')
const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers ]})
const prisma = require('../prisma')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('dm')
    .setDescription('Quack will send a DM to a specific member in the guild.')
    .addMentionableOption(option =>
        option
            .setName('user')
            .setDescription("Target user to DM")
            .setRequired(false)
    )
    .addStringOption(option =>
        option
            .setName('title')
            .setDescription("The title for the embed.")
            .setRequired(false)
    )
    .addStringOption(option =>
        option
            .setName('message')
            .setDescription('The message/description/body of the embed.')
            .setRequired(false)
    )
    .addBooleanOption(option =>
        option
            .setName('confirm')
            .setDescription("Are you sure you would like to do this - the action is irreversable!")
            .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Only can be seen/ran if user is administrator.
    async execute(interaction) {

        const targetGuild = interaction.guild
        const guildId = targetGuild.id
        const name = targetGuild.name

        const title = interaction.options.getString('title') ?? `Message from ${name}`
        const message = interaction.options.getString('message') ?? `This is an unconfigured message from ${name}`
        const confirmation = interaction.options.getBoolean('confirm') ?? false
        const targetUser = interaction.options.getMentionable('user') ?? false

        if (!confirmation) return;

        const confirmEmbed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle('DM Successful')
            .setURL('https://quack.robuxtrex.co.uk/commands/ban')
            .setDescription(`Quacker has successfully sent a DM to everyone in Guild ${name}!`)
            .addFields(
                { name: 'Title', value: `${title}` },
                { name: 'Message', value: `${message}` }
            )
        const dmEmbed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle(`Message from ${name}: ${title}`)
            .setDescription(`${message}`)
            
        await interaction.reply({ embeds: [confirmEmbed], ephemeral: true })

        const guildMembers = targetGuild.members.cache
        
        targetUser.send({ embeds: [dmEmbed] }).catch(async err => {
            await interaction.followUp(`The user ${member} does not have their DMs on! Disable this message in the dashboard, or by using /dashboard dm true false (experimental)`)
        })
    }
}