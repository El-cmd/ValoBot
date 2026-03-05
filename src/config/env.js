const env = {
  discordToken: process.env.DISCORD_TOKEN,
  riotApiKey: process.env.RIOT_API_KEY,
  riotApiBaseUrl: process.env.RIOT_API_BASE_URL || "https://eu.api.riotgames.com",
  riotLocale: process.env.RIOT_LOCALE || "fr-FR"
};

// Verifie qu'une variable requise est presente avant de l'utiliser.
function requireEnv(name, value) {
  if (!value) {
    throw new Error(`${name} manquant dans l'environnement.`);
  }

  return value;
}

// Retourne le token Discord en s'assurant qu'il existe.
function getDiscordToken() {
  return requireEnv("DISCORD_TOKEN", env.discordToken);
}

// Retourne la cle Riot en s'assurant qu'elle existe.
function getRiotApiKey() {
  return requireEnv("RIOT_API_KEY", env.riotApiKey);
}

module.exports = {
  env,
  getDiscordToken,
  getRiotApiKey
};
