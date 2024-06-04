import { ChatInputCommandInteraction } from 'discord.js';
import { SampleWidget } from './widgets/SampleWidget';

export default async (interaction: ChatInputCommandInteraction) => {
	// Response to the buy command is ephemeral
	await interaction.deferReply({ ephemeral: true });

	// Offer to buy
    let sampleWidget = new SampleWidget(interaction);
	try {
		await sampleWidget.run();
	} catch (e: any) {
		await sampleWidget.handleError(e);
	}
};
