import {
	ActionRowBuilder,
	ButtonStyle,
	ButtonBuilder,
	CollectorFilter,
	DiscordjsError,
	DiscordjsErrorCodes,
	EmbedBuilder,
	ChatInputCommandInteraction,
	InteractionReplyOptions,
	ButtonInteraction,
	ChannelType,
	GuildTextBasedChannel,
	PermissionFlagsBits,
} from 'discord.js';
import { logger } from '../../app';

export abstract class BaseWidget {
	protected interaction: ChatInputCommandInteraction | ButtonInteraction;
	isFirstPaint = true;
	// Used to track the state of the widget, usually overridden
	state: any = undefined;
	// By default, all widgets are private. This means that the first message will be ephemeral
	isPrivate = true;

	constructor(interaction: ChatInputCommandInteraction | ButtonInteraction) {
		this.interaction = interaction;
	}

	abstract run(): Promise<void>;

	updateInteraction(options: InteractionReplyOptions) {
		if (this.isFirstPaint) {
			this.isFirstPaint = false;
			return this.interaction.followUp({ ephemeral: this.isPrivate, ...options });
		} else {
			return this.interaction.editReply({ ...options });
		}
	}

	abstract getInteractionReplyOptions(): InteractionReplyOptions;

	// Re-render the interaction with new information
	// If we need to refetch the quote, we can do that here
	async render() {
		return this.updateInteraction(this.getInteractionReplyOptions());
	}

	hasChannelSendPermission(): boolean {
		if (this.interaction.channel?.type == ChannelType.GuildText) {
			return (this.interaction.channel as GuildTextBasedChannel)
				.permissionsFor(this.interaction.guild?.members.me!)
				?.has(PermissionFlagsBits.SendMessages);
		}

		return true;
	}

	// NOTE: This is a really messy function. Refactor when you can.
	async handleError(e: Error, retryState?: any) {
		logger.log(e.message);
        // TODO: Handle errors based on the error message
		switch (e.message) {
			default:
				console.error(e);
				const errorEmbed = new EmbedBuilder().setTitle('Error').setDescription(e.message).setColor('#ff0000');
				await this.updateInteraction({
					embeds: [errorEmbed],
					components: [],
				});
		}
	}
}
