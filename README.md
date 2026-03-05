# ValoBot

Bot Discord minimal base sur `discord.js` v14 et `Node.js 20+`.

## Fonctionnement

Le bot repond dans le meme salon avec `Salut <pseudo> 👋` si :

- le message contient une mention du bot
- le message contient le mot `salut` (insensible a la casse)

`<pseudo>` correspond au `displayName` Discord de l'auteur (`nickname` du serveur si disponible, sinon `username`).

Le bot peut aussi lister les maps VALORANT avec :

- `@ValoBot maps`
- `@ValoBot serveur status`
- `@ValoBot help`

## Prerequis

- Docker et Docker Compose
- Un bot Discord avec son token

## Important: Message Content Intent

Il faut activer **MESSAGE CONTENT INTENT** dans le Developer Portal Discord :

`Bot -> Privileged Gateway Intents -> MESSAGE CONTENT INTENT`

Sans cette option, le bot ne verra pas le contenu des messages et ne pourra pas detecter `salut`.

## Configuration

```bash
cp .env.example .env
```

Puis editer `.env` et definir :

```env
DISCORD_TOKEN=ton_token_discord
RIOT_API_KEY=ta_cle_api_riot
RIOT_API_BASE_URL=https://eu.api.riotgames.com
RIOT_LOCALE=fr-FR
```

Notes Riot :

- `RIOT_API_KEY` est necessaire pour `@ValoBot maps`
- `RIOT_API_BASE_URL` peut pointer vers une plateforme VALORANT adaptee, par exemple `https://eu.api.riotgames.com` ou `https://na.api.riotgames.com`
- `RIOT_LOCALE` permet de choisir la langue retournee par Riot

## Commandes Make

```bash
make build
make up
make down
make logs
make restart
```

## Demarrage

```bash
make build
make up
make logs
```

Quand tout est correct, les logs affichent une ligne de ce type :

```text
Connecte en tant que ValoBot#1234
```

## Test

Dans un salon texte du serveur :

```text
@ValoBot salut
```

Le bot doit repondre :

```text
Salut TonPseudo 👋
```

Pour lister les maps VALORANT :

```text
@ValoBot maps
```

Le bot doit repondre avec une liste de maps recuperee depuis l'API Riot.

Pour afficher l'etat des serveurs VALORANT :

```text
@ValoBot serveur status
```

Le bot doit repondre avec un resume des incidents et maintenances en cours.

Pour afficher l'aide :

```text
@ValoBot help
```

Le bot doit repondre avec la liste des commandes disponibles et leur utilite.
