import { Client, TextChannel } from 'discord.js';

// LOG CHANNEL: Place to pipe logs
// Make this a private channel only the bot / team members have access to
const LOG_CHANNEL_ID = '1144669530224873564';

export class Logger {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	log(message: string, _level: string = 'info') {
		this.client.channels.fetch(LOG_CHANNEL_ID).then((channel) => {
			if (!(channel instanceof TextChannel)) {
				throw new Error('Channel is not a text channel');
			}
			channel.send(message);
			console.log(message);
			return message;
		});
	}
}
