const {
  Client,
  Events,
  GatewayIntentBits,
  Partials
} = require("discord.js");
const { registerMessageCreateHandler } = require("./message-create");

// Cree le client Discord, configure les intents et enregistre les handlers.
function createDiscordClient() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
  });

  client.once(Events.ClientReady, (readyClient) => {
    console.log(`Connecte en tant que ${readyClient.user.tag}`);
  });

  registerMessageCreateHandler(client);

  return client;
}

module.exports = {
  createDiscordClient
};
