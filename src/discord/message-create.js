const { Events } = require("discord.js");
const { fetchValorantMaps } = require("../riot-api/val-content-v1-contents");
const { fetchValorantServerStatus } = require("../riot-api/val-status-v1-platform-data");

// Verifie si le message contient une mention explicite du bot.
function isBotMentioned(message, botUserId) {
  return message.mentions.users.has(botUserId);
}

// Priorise le nickname du serveur, sinon utilise le username.
function getAuthorDisplayName(message) {
  return message.member?.displayName || message.author.username;
}

// Envoie une reponse Discord sans faire tomber le handler en cas d'erreur.
async function replySafely(message, content) {
  try {
    await message.reply(content);
  } catch (error) {
    console.error("Erreur lors de l'envoi de la reponse:", error.message);
  }
}

// Gere la commande de salutation.
async function handleSalut(message) {
  await replySafely(message, `Salut ${getAuthorDisplayName(message)} 👋`);
}

// Gere la commande maps en recuperant les maps via l'API Riot.
async function handleMaps(message) {
  try {
    const maps = await fetchValorantMaps();

    if (maps.length === 0) {
      await replySafely(message, "Je n'ai trouve aucune map VALORANT.");
      return;
    }

    await replySafely(message, `Maps VALORANT : ${maps.join(", ")}`);
  } catch (error) {
    console.error("Erreur lors de la recuperation des maps:", error.message);
    await replySafely(message, "Impossible de recuperer les maps VALORANT pour le moment.");
  }
}

// Gere la commande status en resumant l'etat actuel des serveurs VALORANT.
async function handleStatus(message) {
  try {
    const status = await fetchValorantServerStatus();

    if (status.incidentCount === 0 && status.maintenanceCount === 0) {
      await replySafely(
        message,
        `Etat des serveurs VALORANT (${status.platformName}) : OK. Aucun incident ni maintenance.`
      );
      return;
    }

    const details = [
      `Etat des serveurs VALORANT (${status.platformName}) : ${status.incidentCount} incident(s), ${status.maintenanceCount} maintenance(s).`
    ];

    if (status.primaryIssueTitle) {
      const severity = status.primaryIssueSeverity ? ` ${status.primaryIssueSeverity}` : "";
      details.push(
        `Principal ${status.primaryIssueType || "evenement"}${severity} : ${status.primaryIssueTitle}.`
      );
    }

    if (status.primaryIssueDescription) {
      details.push(status.primaryIssueDescription);
    }

    await replySafely(message, details.join(" "));
  } catch (error) {
    console.error("Erreur lors de la recuperation du statut des serveurs:", error.message);
    await replySafely(
      message,
      "Impossible de recuperer l'etat des serveurs VALORANT pour le moment."
    );
  }
}

// Gere la commande help en listant les commandes disponibles.
async function handleHelp(message) {
  const helpMessage = [
    "Commandes disponibles :",
    "- `@ValoBot salut` : salue l'utilisateur qui mentionne le bot.",
    "- `@ValoBot maps` : liste les maps VALORANT.",
    "- `@ValoBot serveur status` : affiche l'etat des serveurs VALORANT.",
    "- `@ValoBot help` : affiche cette aide."
  ].join("\n");

  await replySafely(message, helpMessage);
}

// Branche la logique metier sur l'evenement MessageCreate de Discord.
function registerMessageCreateHandler(client) {
  client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot || !message.inGuild() || !client.user) {
      return;
    }

    if (!isBotMentioned(message, client.user.id)) {
      return;
    }

    if (/\bsalut\b/i.test(message.content)) {
      await handleSalut(message);
      return;
    }

    if (/\bmaps\b/i.test(message.content)) {
      await handleMaps(message);
      return;
    }

    if (/\bserveur\s+status\b/i.test(message.content)) {
      await handleStatus(message);
      return;
    }

    if (/\bhelp\b/i.test(message.content)) {
      await handleHelp(message);
    }
  });
}

module.exports = {
  registerMessageCreateHandler
};
