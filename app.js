// CONGIG
// ------
import { Client, Collection, Events, GatewayIntentBits, ActivityType } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'node:fs';

dotenv.config();


// BOT STARTUP EVENT
// -----------------
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = process.env.DISCORD_TOKEN;

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
    client.user.setActivity({name: 'Pokémon Platine', type: ActivityType.Playing });
});

client.login(token);


// BOT COMMANDS SETUP
// ------------------
client.commands = new Collection();

const commands = fs
    .readdirSync('./commands')
    .filter((file) => file.endsWith('.js'))
;

for (let command of commands) {
    const commandFile = await import(`./commands/${command}`);
    client.commands.set(commandFile.data.name, commandFile.invoke)
}


// BOT EVENT EXECUTION
// -------------------
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command(interaction);
    } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
    }
});
