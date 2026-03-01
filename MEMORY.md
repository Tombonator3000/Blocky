# MEMORY.md - GeminiCraft Project Memory

## Prosjektoversikt
**Navn:** GeminiCraft
**Type:** Minecraft-lignende voxelspill i nettleseren
**Stack:** React 19 + Three.js + React Three Fiber + Cannon Physics + Vite + Tailwind CSS
**AI-integrasjon:** Google Gemini 2.5 Flash Image (teksturgenerering)
**State Management:** Zustand

## Arkitektur
```
src/
├── App.tsx              - Rotnivå, renderer kun <Game />
├── main.tsx             - React entry point
├── index.css            - Global styles (Tailwind)
├── components/
│   ├── Game.tsx         - Hoved-spillkomponent, Three.js Canvas + UI
│   ├── Player.tsx       - Spiller-fysikk og kamerakontroll (WASD + Space)
│   ├── World.tsx        - Blokkverdenen, klikk for å mine/plassere
│   └── TextureGenerator.tsx - UI for Gemini AI-teksturgenerering
├── services/
│   └── gemini.ts        - Google GenAI klient for bildegenerering
└── store/
    └── gameStore.ts     - Zustand store (blokker, teksturer, valgt blokk)
```

## Nøkkeldetaljer
- **BlockType:** 'dirt' | 'grass' | 'stone' | 'wood' | 'glass'
- **Initial verden:** 20x20 grid på y=0 (grass), tilfeldige stone-blokker
- **Spiller:** Sphere physics body, kamera følger med offset +0.7 på y
- **Mining:** Venstreklikk for å fjerne blokk
- **Plassering:** Høyreklikk (contextmenu) for å legge til blokk på naboflate
- **GEMINI_API_KEY:** Bakes inn i klient-bundle ved build via Vite define

## Avhengigheter (ubrukte)
- `express` og `better-sqlite3` er i package.json men **ingen server.ts eksisterer**
- Disse er trolig rester fra fremtidige multiplayer-planer

## Deployment
- **GitHub Pages:** Deployes via GitHub Actions workflow på push til `main`
- **Base URL:** `'./'` (relative paths, fungerer uavhengig av repo-navn)
- **AI Studio:** Opprinnelig deployet der, men GitHub Pages er nå primær

## Viktige konfigurasjoner
- `vite.config.ts`: `base: './'` for GitHub Pages, `define` for GEMINI_API_KEY
- `tsconfig.json`: target ES2022, allowImportingTsExtensions
- Dev server: port 3000, `--host=0.0.0.0`
