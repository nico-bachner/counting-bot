const { roles, channels } = require('../config.json');

// create a new Discord bot session
const Discord = require('discord.js');
const bot = new Discord.Client();
require('dotenv').config();
bot.login(process.env.AUTH_TOKEN);

// this event will only trigger once (on bot init)
bot.on('ready', () => {
	console.log('\x1b[32m%s\x1b[0m', "--- Interactive Bot Online ---");
});

// interactive functionality
bot.on('message', message => {
    console.log(`${message.author.username}:`, message.content);
});

// Automatically reconnect if the bot disconnects due to inactivity
bot.on('disconnect', function(errorMessage, code) {
	console.log('\x1b[31m%s\x1b[0m', `--- Bot disconnected from Discord with code ${code} for the following reason: ${errorMessage} ---`);
	bot.connect();
});