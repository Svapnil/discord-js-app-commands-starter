// sync commands here
// usage bun 'run.ts'

import { Client, Events, GatewayIntentBits } from "discord.js";
import { sync_commands } from "../../src/commands/config";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.on(Events.ClientReady, () => {
  if (client.user) {
    console.log(`Logged in as ${client.user.tag}! Now Syncing Commands`);
    sync_commands().then(() => console.log("All commands synced! Exit app."));
  } else {
    console.log("Something went wrong, can't find myself.");
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

