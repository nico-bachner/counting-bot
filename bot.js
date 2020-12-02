const { roles, channels } = require('./config.json');

// create a new Discord bot session
const Discord = require('discord.js');
const bot = new Discord.Client();
require('dotenv').config();
bot.login(process.env.AUTH_TOKEN);

// this event will only trigger once: on bot init
bot.on('ready', () => {
	console.log('\x1b[32m%s\x1b[0m', "--- Bot online ---");
	const args = process.argv.slice(2);
	if (args[0] == "announce") {
		bot.channels.cache.get(channels.bots).send("Hello there! I'm back online");
	} else 
	if (args[0] == "revive") {
		bot.channels.cache.get(channels.bots).send("Hello there! I have recovered from my mortal injury");
	}
});

// new member welcome
bot.on('guildMemberAdd', member => {
	console.log(`${member} joined the server`)
	member.guild.channels.cache.get(channels.welcome).send(`:wave: Welcome, <@${member.id}> to **${member.guild.name}** :wave:`); 
});

// interactive functionality
bot.on('message', message => {
	// for testing only: console.log(message.author.username, ":", message.content)
	
	const args = message.content.toLowerCase().trim().split(' ');
	const command = args.shift();
	console.log(command, args);

	switch (command) {
		case 'happy':
			message.react('😄');
			break;
		case 'sad':
			message.react('😢');
			break;
		case 'count':
			switch (args[0]) {
				case 'integer':
					if (args[1] != undefined) {
						for ( var i = 1 ; i <= args[1] ; i++ ) {
							count = ("`"+i+"`");
						}
						message.channel.send(count);
					} 
					else {
						message.channel.send("Which integer would you like me to find?");
					}
					break;
				case 'to':
				case 'integers':
					if (args[1] == 'from') {
						if (args[2] != undefined) {
							if (args[2] <= 500 ) {
								count = []
								for ( var i = args[2] ; i > 0 ; i-- ) {
									count.push("`"+i+"`");
								}
								message.channel.send(count);
							}
							else {
								message.channel.send("That ain't gonna work");
							}
						} 
						else {
							message.channel.send("From what number would you like me to count down?");
						}
					} else {
						if (args[1] != undefined) {
							if (args[1] <= 500 ) {
								count = []
								for ( var i = 1 ; i <= args[1] ; i++ ) {
									count.push("`"+i+"`");
								}
								message.channel.send(count);
							}
							else {
								message.channel.send("That ain't gonna work");
							}
						}
						else {
							message.channel.send("Until what number would you like me to count?");
						}
					}
					break;
				case 'square':
					if (args[1] != undefined ) {
						a = 1;
						for ( let i = 1; i <= args[1]; i++ ) {
							b = a * a;
							square = "`"+b+"`";
							a++;
						}
						message.channel.send(square);
					}
					else {
						message.channel.send("Which square would you like me to find?");
					}
					break;
				case 'squares':
					if (args[1] != undefined ) {
						terms = args[1];
					}
					else {
						terms = 100;
					}
					squares = [];
					a = 1;
					for ( let i = 1; i <= terms ; i++ ) {
						b = a * a;
						squares.push("`"+b+"`"+""+`(${i})`);
						a++;
					}
					message.channel.send(squares);
					break;
				case 'cube':
					if (args[1] != undefined ) {
						term = args[1];
						a = 1;
						for ( let i = 1; i <= term ; i++ ) {
							b = a * a * a;
							cube = "`"+b+"`";
							a++;
						}
						message.channel.send(cube);
					}
					else {
						message.channel.send("Which cube would you like me to find?");
					}
					break;
				case 'cubes':
					if (args[1] != undefined ) {
						terms = args[1];
					}
					else {
						terms = 100;
					}
					cubes = [];
					a = 1;
					for ( let i = 1; i <= terms ; i++ ) {
						b = a * a * a;
						cubes.push("`"+b+"`"+""+`(${i})`);
						a++;
					}
					message.channel.send(cubes);
					break;
				case 'fibonacci':
					if (args[1] != undefined ) {
						term = args[1];
						a = 0;
						b = 1;
						c = 1;
						for ( var i = 1; i <= term ; i++ ) {
							fibonacci = "`"+c+"`";
							c = a + b;
							a = b;
							b = c;
						}
						message.channel.send(fibonacci);
					}
					else {
						message.channel.send("Which term of the fibonacci sequence would you like me to find?");
					}
					break;
				case 'fibonaccis':
					if (args[1] != undefined ) {
						terms = args[1];
					}
					else {
						terms = 100;
					}
					fibonaccis = [];
					a = 0;
					b = 1;
					c = 1;
					for ( var i = 1; i <= terms ; i++ ) {
						fibonaccis.push("`"+c+"`"+""+`(${i})`);
						c = a + b;
						a = b;
						b = c;
					}
					message.channel.send(fibonaccis);
					break;
				case 'factorial':
					if (args[1] != undefined ) {
						term = args[1];
						a = 1;
						b = a;
						for ( var i = 1; i <= term ; i++ ) {
							b *= a;
							factorial = "`"+b+"`";
							a++;
						}
						message.channel.send(factorial);
					}
					else {
						message.channel.send("Which factorial would you like me to find?");
					}
					break;
				case 'factorials':
					if (args[1] != undefined ) {
						terms = args[1];
					}
					else {
						terms = 50;
					}
					factorials = [];
					a = 1;
					b = a;
					for ( var i = 1; i <= terms ; i++ ) {
						b *= a;
						factorials.push("`"+b+"`"+""+`(${i})`);
						a++;
					}
					message.channel.send(factorials);
					break;
				default:
					if (args[0] != undefined) {
						message.channel.send(`What are ${args[0]}?`); 
					}
					else {
						message.channel.send("How would you like me to count?"); 
					}
			}
			break;
		case 'welcome':
			const welcome = new Discord.MessageEmbed()
				.setTitle(`Hello and welcome to the **${message.guild.name}**`)
				.setDescription("We're a community of devs")
				.addFields(
					{ name: 'Server Invite Link', value: '[https://discord.gg/https://discord.gg/DKKkJYj8hu](https://discord.gg/https://discord.gg/DKKkJYj8hu)' },
					{ name: 'Rules', value: '**Read the [official discord rules and guidelines](https://discordapp.com/guidelines)**'},
					{ name: 'Contributing', value: '**Contribute to our [homegrown bot](https://github.com/nico-bachner/dev-bot)**'}
				)
				.setTimestamp()
			message.channel.send(welcome);
			break;
		case 'info':
			switch(args[0]) {
				case 'server':
					message.channel.send(
						new Discord.MessageEmbed()
						.setTitle(`**${message.guild.name}**`)
						.addFields(
							{ name: 'Founded', value: message.guild.createdAt },
							{ name: 'Region', value: message.guild.region },
							{ name: 'Owner', value: message.guild.owner },
							{ name: 'Members', value: message.guild.memberCount },
							{ name: 'Rules', value: message.guild.rulesChannel }
						)
						.setTimestamp()
					);
					break;
				case 'user':
					return message.reply(`your username is ${message.author.username} and your user ID is ${message.author.id}`);
				default:
					message.channel.send("On which subject doth thee seek knowledge?");
			}
	}
});

// Automatically reconnect if the bot disconnects due to inactivity
bot.on('disconnect', function(erMsg, code) {
	console.log('\x1b[31m%s\x1b[0m', `--- Bot disconnected from Discord with code ${code} for the following reason: ${erMsg} ---`);
	bot.connect();
});