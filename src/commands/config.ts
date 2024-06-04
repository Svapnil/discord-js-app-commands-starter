import { REST, Routes } from 'discord.js';

// NOTE: USE IN THE /scripts/sync_commands script

// TODO: Use a Prod / Dev Config to get the client id
import dotenv from 'dotenv';
dotenv.config();
const CLIENT_ID = process.env.DISCORD_CLIENT_ID || '';

export const commands = [
	{
		name: 'sample',
		type: 1,
		description: 'Sample command',
		options: [
		],
	},
];

export async function sync_commands() {
	const rest = new REST({ version: '10' });

	if (process.env.DISCORD_BOT_TOKEN) {
		rest.setToken(process.env.DISCORD_BOT_TOKEN);
	} else {
		throw new Error('Discord bot token is not defined in the environment variables.');
	}

	try {
		const res = await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
		console.log('SYNCED COMMANDS', res);
	} catch (error) {
		console.error(error);
	}
}
