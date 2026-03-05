# ValoBot

<p align="center">
  <img src="./assets/valobot-logo.png" alt="ValoBot logo" width="320" />
</p>

ValoBot est un projet de bot Discord en developpement autour de VALORANT et de l'API Riot.

## Ce que fait le bot

- `@ValoBot salut` -> repond: `Salut <ton pseudo> 👋`
- `@ValoBot maps` -> liste les maps VALORANT
- `@ValoBot serveur status` -> resume l'etat des serveurs VALORANT
- `@ValoBot help` -> affiche l'aide des commandes

## Prerequis

- Docker + Docker Compose installes sur le serveur
- Un bot Discord cree dans le Developer Portal
- Une cle API Riot (dev ou prod)

## Important Discord

Active **MESSAGE CONTENT INTENT** ici:

`Discord Developer Portal -> Bot -> Privileged Gateway Intents -> MESSAGE CONTENT INTENT`

Sans ca, le bot ne peut pas lire le contenu des messages.

## Installation rapide

1. Copier le fichier d'environnement:

```bash
cp .env.example .env
```

2. Remplir `.env`:

```env
DISCORD_TOKEN=ton_token_discord
RIOT_API_KEY=ta_cle_riot
RIOT_API_BASE_URL=https://eu.api.riotgames.com
RIOT_LOCALE=fr-FR
```

3. Lancer le bot:

```bash
make build
make up
make logs
```

Si tout va bien, tu verras:

```text
Connecte en tant que VALOBOT#xxxx
```

## Commandes Make

```bash
make build    # construit l'image
make up       # demarre le conteneur
make down     # arrete le conteneur
make logs     # suit les logs en direct
make restart  # redemarre le bot
```

## Test rapide sur Discord

Dans un salon texte ou le bot est present:

```text
@ValoBot salut
@ValoBot maps
@ValoBot serveur status
@ValoBot help
```

## Depannage

- `Used disallowed intents`: active `MESSAGE CONTENT INTENT` puis redemarre (`make restart`).
- `Riot API ... 401`: ta cle Riot est invalide/expiree, regenere-la et mets a jour `.env`.
- Le bot ne repond pas: verifie qu'il est bien mentionne (`@ValoBot ...`) et que `make logs` montre `Connecte en tant que ...`.

## Securite

- Ne commit jamais `.env`.
- Regenerer les tokens si tu les as exposes dans des logs ou captures.
