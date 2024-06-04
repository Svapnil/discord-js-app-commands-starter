import {
    ActionRowBuilder,
    ButtonInteraction,
    EmbedBuilder,
    ButtonStyle,
    ButtonBuilder,
    ChatInputCommandInteraction,
    InteractionReplyOptions,
} from 'discord.js';
import { BaseWidget } from './BaseWidget';
import { logger } from '../../app';

export enum SampleWidgetState {
    Initial,
}

export class SampleWidget extends BaseWidget {
    override state: SampleWidgetState = SampleWidgetState.Initial;

    constructor(interaction: ChatInputCommandInteraction | ButtonInteraction) {
        super(interaction);
    }

    async run() {
        await this.render();
        logger.log(`${this.interaction.user.username} tried a sample application.`);
    }

    getInteractionReplyOptions(): InteractionReplyOptions {
        switch(this.state) {
            case SampleWidgetState.Initial:
                return {
                    embeds: [new EmbedBuilder().setTitle('Sample Command').setDescription('sample').setColor('#0000ff')],
                    components: [new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Sample Link').setURL('https://google.com'))],
                };
        }
    }
}
