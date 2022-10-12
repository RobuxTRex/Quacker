// Quack
// Discord.js v14
// slash.js
// src/slash.js
//
// Slash Commands

const { SlashCommandBuilder, Routes } = require('discord.js')
const { REST } = require('@discordjs/rest')
const { guildId, clientId, token } = require('./info.json')

const commands = [
    new SlashCommandBuilder()
        .setName('pong')
        .setDescription('Quack will respond with Pong!'),
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Quack will ping the selected user.')
        .addMentionableOption(option => 
            option.setName('username')
                .setDescription("Username of who you would like to ping.")
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Quack will repeat your message.')
        .addStringOption(option =>
            option.setName('message')
                .setDescription("The message you'd like to be sent.")
                .setRequired(true)       
        ),
    new SlashCommandBuilder()
        .setName('role')
        .setDescription(`Quack will help manage your server's roles.`)
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Lists all members with the selected role.')
                .addUserOption(option =>
                    option.setName('role')
                        .setDescription('Target role to list.')
                        .setRequired(true)
                    )
            )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Removes the select role.')
                .addUserOption(option =>
                    option.setName('role')
                        .setDescription('Target role to remove permanently.')
                        .setRequired(true)
                    )
            )
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription('Creates a role with the selected parameters.')
                .addStringOption(option =>
                    option.setName('name')
                        .setDescription(`Name of the role you would like to create. Leave blank for default ('New role').`)
                        .setRequired(false)
                    )
                .addStringOption(option =>
                    option.setName('color')
                        .setDescription(`Color of the role you would like to create. Leave blank for default (white).`)
                        .setRequired(false)
                    )
            ),
    new SlashCommandBuilder()
        .setName('alert')
        .setDescription('Quack will alert staff.')
        .addStringOption(option =>
            option.setName('priority')
                .setDescription(`How urget the alert/request is.`)
                .setRequired(true)
                .addChoices(
                    { name: 'Low', value: 'Low' },
                    { name: 'Medium', value: 'Medium' },
                    { name: 'High', value: 'High' },
                    { name: 'Urgent', value: 'Urgent' },
                )
            )
        .addStringOption(option =>
            option.setName('message')
                .setDescription(`The message you would like to send to staff.`)
                .setRequired(false)
            )
]

    .map(command => command.toJSON())

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then((data) => console.log(`Successfully registered ${data.length} slash commands!`))
    .catch(console.error)
