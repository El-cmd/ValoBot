const { env, getRiotApiKey } = require("../config/env");

// Normalise la locale pour correspondre au format utilise par Riot dans les traductions.
function normalizeRiotLocale(locale) {
  return locale.replace("-", "_");
}

// Recupere le meilleur texte localise disponible avec fallback sur l'anglais puis le premier element.
function pickLocalizedContent(entries, locale) {
  if (!Array.isArray(entries) || entries.length === 0) {
    return null;
  }

  const normalizedLocale = normalizeRiotLocale(locale);

  return (
    entries.find((entry) => entry.locale === normalizedLocale)?.content ||
    entries.find((entry) => entry.locale === "en_US")?.content ||
    entries[0].content ||
    null
  );
}

// Appelle l'endpoint Riot VAL status et retourne le JSON brut.
async function fetchValStatusV1PlatformData() {
  const url = new URL("/val/status/v1/platform-data", env.riotApiBaseUrl);

  const response = await fetch(url, {
    headers: {
      "X-Riot-Token": getRiotApiKey()
    }
  });

  if (!response.ok) {
    throw new Error(`Riot API a repondu avec le statut ${response.status}.`);
  }

  return response.json();
}

// Transforme la reponse Riot en un resume court adapte a Discord.
async function fetchValorantServerStatus() {
  const data = await fetchValStatusV1PlatformData();
  const maintenances = Array.isArray(data.maintenances) ? data.maintenances : [];
  const incidents = Array.isArray(data.incidents) ? data.incidents : [];
  const primaryIssue = maintenances[0] || incidents[0] || null;

  return {
    platformName: data.name || data.id || "Inconnu",
    maintenanceCount: maintenances.length,
    incidentCount: incidents.length,
    primaryIssueType: maintenances[0] ? "maintenance" : incidents[0] ? "incident" : null,
    primaryIssueSeverity: primaryIssue?.incident_severity || null,
    primaryIssueTitle: pickLocalizedContent(primaryIssue?.titles, env.riotLocale),
    primaryIssueDescription: pickLocalizedContent(
      primaryIssue?.updates?.[0]?.translations,
      env.riotLocale
    )
  };
}

module.exports = {
  fetchValStatusV1PlatformData,
  fetchValorantServerStatus
};
