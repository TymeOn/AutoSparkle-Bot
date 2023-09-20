// CONGIG
// ------
import { Client, Events, GatewayIntentBits, ActivityType } from 'discord.js';
import dotenv from 'dotenv';
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

