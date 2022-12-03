// Quacker 2.0
// SulphurDev
//
// interaction.js
// General handler for interactions, like buttons or onJoinEvents.

console.log("interaction.js initilised")
const prisma = require('./prisma')

const { Client, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events, GatewayIntentBits, TextChannel, Collection } = require('discord.js')
const { token } = require('../cred/config.json')
const { verifyEmbed } = require('./embed')
// const { Users, CurrencyShop } = require('./dbObjects.js');
const { user } = require('./commands/xp')

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers ]})
const currency = new Collection()

client.on(Events.InteractionCreate, async interaction => {
    console.log("e")
	if(!interaction.isButton()) return;

	const command = interaction.customId
    const member = interaction.member

    console.log(command)

	console.log(`${member} clicked the ${command} button`)
	
	if(command === 'verify') {
		const role = "1047563966559293480"
        const verify = "1047581450385494026"
        member.roles.add(role)
        member.roles.remove(verify)
        interaction.deferUpdate()
	}
})

async function addXP(id, amount) {
	const user = currency.get(id);

	if (user) {
		user.balance += Number(amount);
		return user.save();
	}

	const newUser = await Users.create({ user_id: id, balance: amount });
	currency.set(id, newUser);

	return newUser;
}

function getXP(id) {
	const user = currency.get(id);
	return user ? user.balance : 0;
}

const userLVL = Math.floor(getXP(user)/50/10) // DEFAULT FORMULA: xp/50/10
const nextLVL = userLVL+1
const nextReward = null
// TODO: add Reward Roles & Requirements to dashboard, save in database. Then retrieve the data here and set nextReward to the next reward's role (and how many levels to go in 2nd field)
// TODO: make the XP Formula changeable

const verifyInteractions = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('verify')
            .setLabel('Verify!')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setLabel('More information...')
            .setStyle(ButtonStyle.Link)
            .setURL("https://quack.robuxtrex.co.uk/discord/verify")
    )

//client.on(Events.ClientReady, async client => {
//    const storedBalances = await Users.findAll();
//	storedBalances.forEach(b => currency.set(b.user_id, b));
//    ( client.channels.cache.get('1047589319545737236')).send('Hello here!')
//})


client.on(Events.MessageCreate, message => {

    if(message.author.bot) return;

    addXP(message.author.id, 10)

	let guildID = message.guild.id
	let guild = client.guildID.member

    client.channels.get('1047589319545737236').send()

    module.exports = guild
    console.log(guild)
})

module.exports = {
    verifyInteractions,
    addXP,
    getXP,
    level: userLVL,
    nextLevel: nextLVL,
    nextReward,
}

client.login(token)