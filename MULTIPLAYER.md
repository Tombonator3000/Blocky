# MULTIPLAYER.md - GeminiCraft Multiplayer Plan

## Status: Ikke implementert

## Oversikt
GeminiCraft har for øyeblikket ingen multiplayer-funksjonalitet. Prosjektet inneholder
avhengighetene `express` og `better-sqlite3` i `package.json`, men ingen backend-kode
eksisterer ennå. Dette dokumentet beskriver planen for multiplayer.

---

## Arkitekturplan

### Backend (Node.js)
```
server/
├── server.ts          - Express HTTP + WebSocket server
├── db.ts              - SQLite database setup (better-sqlite3)
├── routes/
│   └── world.ts       - REST endpoints for world state
└── socket/
    └── game.ts        - WebSocket handlers for real-time events
```

### Frontend endringer
- Legg til `socket.io-client` (eller native WebSocket)
- Synkroniser blokkendringer med serveren
- Vis andre spillere i verden (ghost players)
- Delt teksturkart mellom spillere

---

## Database-skjema (SQLite)

```sql
-- Verdenstilstand
CREATE TABLE blocks (
  id TEXT PRIMARY KEY,
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  z INTEGER NOT NULL,
  type TEXT NOT NULL,
  placed_by TEXT,
  placed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Spillere (session-basert)
CREATE TABLE players (
  id TEXT PRIMARY KEY,
  name TEXT,
  x REAL,
  y REAL,
  z REAL,
  last_seen DATETIME
);
```

---

## WebSocket Events

### Client → Server
- `block:add` - `{ x, y, z, type }` - Spiller plasserer blokk
- `block:remove` - `{ x, y, z }` - Spiller miner blokk
- `player:move` - `{ x, y, z, rotation }` - Spillerposisjon oppdatering

### Server → Client
- `block:added` - `{ id, x, y, z, type, playerId }` - Blokk ble plassert av noen
- `block:removed` - `{ x, y, z, playerId }` - Blokk ble minet av noen
- `player:joined` - `{ playerId, name }` - Ny spiller koblet til
- `player:left` - `{ playerId }` - Spiller koblet fra
- `player:moved` - `{ playerId, x, y, z }` - Spiller bevegde seg
- `world:state` - `{ blocks: Block[] }` - Full verdenstilstand (ved oppstart)

---

## Deployment for Multiplayer
Multiplayer krever en kjørende server (kan ikke bruke GitHub Pages alene).
Alternativer:
- **Railway.app** - Enkel Node.js deployment, gratis tier tilgjengelig
- **Render.com** - Lignende, gratis tier
- **Fly.io** - Lav latency, global distribusjon
- **Self-hosted** - VPS med nginx reverse proxy

---

## Prioritet
Multiplayer er **lav prioritet** for nå. Fokus er på:
1. Stabil single-player opplevelse
2. GitHub Pages deployment
3. Gameplay-forbedringer

Multiplayer kan implementeres i en fremtidig sprint.
