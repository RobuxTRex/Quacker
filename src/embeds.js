// Quack
// Discord.js v14
// embeds.js
// src/embeds.js
//
// Dedicated Embed Builder

const { EmbedBuilder } = require('discord.js');

const pingEmbed = new EmbedBuilder()
    .setColor(0x5e626e)
    .setDescription('The user was successfully notified!')
    .setAuthor({ name: `Notification Successful!`, iconURL: `https://cdn.discordapp.com/attachments/1018212470306902017/1018266785117638766/yes.png`});

module.exports = {
    pingEmbed: pingEmbed,
};