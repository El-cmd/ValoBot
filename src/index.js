require("dotenv").config();

const { getDiscordToken } = require("./config/env");
const { createDiscordClient } = require("./discord/client");

const client = createDiscordClient();

client.login(getDiscordToken()).catch((error) => {
  console.error("Connexion Discord impossible:", error.message);
  process.exit(1);
});
