// CONGIG
// ------
import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'node:fs';

dotenv.config();

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;


// COMMAND LIST
// ------------
const commandList = [];
const commands = fs
    .readdirSync('./commands')
	.filter((file) => file.endsWith('.js'));

for (let command of commands) {
	const commandFile = await import(`./commands/${command}`);
	commandList.push(commandFile.data)
}


// COMMAND DEPLOYMENT
// ------------------
const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commandList.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commandList },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
