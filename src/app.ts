import { Events, Client, GatewayIntentBits, Interaction } from "discord.js";
import dotenv from "dotenv";
import sample from "./lib/sample";
import { Logger } from "./lib/log";

dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// Set up logger
export const logger = new Logger(client);

client.on(Events.ClientReady, () => {
  if (client.user) {
    console.log(`Logged in as ${client.user.tag}!`);
  } else {
    console.log("Something went wrong, can't find myself.");
  }
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  try {
    // Handle static button interactions
    // if (interaction.isButton() && interaction.customId.startsWith('action')) {
    // }

    // Handle slash commands
    if (!interaction.isChatInputCommand()) return;
    logger.log(
      `Command: ${interaction.commandName} triggered by ${interaction.user.username}`,
    );
    switch (interaction.commandName) {
      case "sample":
        await sample(interaction);
        break;
    }
  } catch (error) {
    console.error(`Top Level Error: ${error}`);
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
