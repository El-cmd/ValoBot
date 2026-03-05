const { env, getRiotApiKey } = require("../config/env");

// Appelle l'endpoint Riot VAL content et retourne le JSON brut.
async function fetchValContentV1Contents() {
  const url = new URL("/val/content/v1/contents", env.riotApiBaseUrl);
  url.searchParams.set("locale", env.riotLocale);

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

// Extrait puis trie les noms de maps VALORANT depuis la reponse Riot.
async function fetchValorantMaps() {
  const data = await fetchValContentV1Contents();
  const maps = Array.isArray(data.maps) ? data.maps : [];

  return maps
    .map((map) => map.name)
    .filter(Boolean)
    .sort((left, right) => left.localeCompare(right, "fr"));
}

module.exports = {
  fetchValContentV1Contents,
  fetchValorantMaps
};
