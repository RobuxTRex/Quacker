// Quacker 2.0
// SulphurDev
//
// bot.js
// Entry point for the bot.

const prisma = require('./prisma')

console.log("bot.js initilised") 

require('./deploy')
require('./embed')
require('./interaction')

const fs = require('node:fs');
const path = require('node:path')
const { Client, Collection, Events, GatewayIntentBits, ActivityType, EmbedBuilder } = require('discord.js')

const { onJoinEmbed } = require('./embed')

const { token } = require('../cred/config.json'); // If you are forking for your own bot, please create YOUR OWN config.json and enter your token in there.
                                             // DO NOT FORGET TO USE .GITIGNORE
const { database, user, password, port, host } = require('../cred/db.json')

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const { errorEmbed } = require('./embed');
const { data } = require('./commands/kick');
const { channel } = require('node:diagnostics_channel')

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages ]})

client.commands = new Collection();

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.once(Events.ClientReady, c => {
    console.log(`Quacker is now online; logged in as ${c.user.tag}`)

	client.user.setPresence({
		activities: [
		  { name: `${client.guilds.cache.size} Discord servers`, type: ActivityType.Watching },
		],
		status: "dnd",
	  });
})

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

	console.log(`${interaction.user.username} ran command ${command}`);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.editReply({ embeds: [errorEmbed], ephemeral: true })
	}
})

client.on(Events.GuildMemberAdd, async member => {
    const role = "1047581450385494026"
    member.roles.add(role)
	console.log(role)

    const memberId = member.id
	const guildId = member.guildId

    const level = await prisma.user.create({
        data: {
            id: memberId,
            xp: 0,
			guild: guildId,
        },
    })
})

client.on(Events.GuildMemberRemove, async member => {
	const memberId = member.id
	const guildId = member.guild.id

		const level = await prisma.user.delete({
			where: {
				id: memberId,
			},
		})
	}
)

async function onLevelUp(xp, level) {
	let nextLevel = level + 1
	let nextLevelXP = level 
}

client.on(Events.MessageCreate, async message => {
	if(message.author.bot) return;

	const memberId = message.member.id
	const member = message.member.name
	const guildId = message.guild.id

	const levelChannel = client.channels.cache.get("1048714559537549332")

	const dat = await prisma.user.findUnique({
		where: { id: memberId },
	})

	let xp = dat.xp
	let divide = xp/500
	let level = Math.floor(xp/500)
	let currentGoal = Math.random(0,1)

	/*
	const update = await prisma.user.upsert({
		where: { id: memberId },
		update: {
			xp: { increment: 5 }
		},
		create: {
			id: memberId,
			xp: 0,
			guild: guildId,
		}
	})
	*/

	const newLevel = Math.floor((xp + 5)/500)

	if (newLevel > level) {
		const lvlEmbed = new EmbedBuilder()
			.setColor(0x00ff00)
			.setTitle('Level up!')
			.setURL('https://quack.robuxtrex.co.uk/discord/lvl-up')
			.setDescription(`Congratulations ${member} for levelling up to **level ${level}**! Run /xp to view the XP stats of yourself or others.`)
		console.log(level)
		levelChannel.send({ embeds: [lvlEmbed] })
	}
})

client.login(token)