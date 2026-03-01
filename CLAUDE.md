# CLAUDE.md - Instruksjoner for Claude Code

## Prosjekt
**GeminiCraft** - Minecraft-lignende voxelspill i nettleseren.
Se MEMORY.md for full arkitekturoversikt.

## Viktige regler

### Alltid gjør dette
1. **Les MEMORY.md** for prosjektkontekst før du gjør endringer
2. **Logg til log.md** med timestamp for alle endringer du gjør
3. **Oppdater todo.md** når du fullfører oppgaver
4. **Sjekk bugs.md** for kjente problemer før du begynner
5. **Kjør `npm run build`** for å verifisere at bygget fungerer etter endringer
6. **Oppdater denne filen (CLAUDE.md)** etter hver feil for å unngå det i fremtiden

### Aldri gjør dette
- Aldri push direkte til `main` - bruk feature branches
- Aldri hardkod API-nøkler i kode
- Aldri legg til unødvendige avhengigheter uten å verifisere de faktisk brukes
- Aldri endre eksisterende arbeidslogikk uten å forstå den først

### Branch-regler
- Utviklingsgren: `claude/review-context-files-2l1ob`
- Push alltid med: `git push -u origin <branch-name>`
- Branch må starte med `claude/` og slutte med session ID

---

## Lærte feil og løsninger

### [2026-03-01] Context-filer manglet
**Problem:** MEMORY.md, log.md, todo.md, bugs.md, MULTIPLAYER.md og CLAUDE.md eksisterte ikke.
**Løsning:** Opprettet alle disse filene med initial innhold ved prosjektstart.
**Leksjon:** Alltid opprett context-filer i starten av en ny prosjektsesjon.

---

## Tekniske notater

### Vite + GitHub Pages
- Bruk alltid `base: './'` i `vite.config.ts` for GitHub Pages deployment
- Dette sikrer at alle assets bruker relative paths, uavhengig av repo-navn
- IKKE bruk `/repo-name/` da dette er hardkodet og brytes ved rename

### GEMINI_API_KEY håndtering
- Nøkkelen bakes inn i klient-bundle ved build via Vite `define`
- I GitHub Actions: bruk `secrets.GEMINI_API_KEY`
- Lokalt: bruk `.env.local` (ignorert av git)
- Spillet **fungerer uten nøkkel** - bare teksturgenerering deaktiveres

### TypeScript
- `tsconfig.json` bruker `"allowImportingTsExtensions": true` - dette krever `"noEmit": true`
- `skipLibCheck: true` er nødvendig pga. typekonflikt i Three.js-pakker
- Bruk `as any` med forsiktighet, ikke overbruk det

### React Three Fiber
- `ref` fra `useBox`/`useSphere` hooks er `MutableRefObject<Object3D>` - må castes med `as any`
- `onContextMenu` fungerer bedre enn `onClick` med `e.button === 2` for høyreklikk
- `PointerLockControls` krever et klikk for å aktivere musepekerlåsing

### Prettier/Linting
- Ingen ESLint/Prettier config - følg eksisterende kodestil
- Bruk `npm run lint` (kjører `tsc --noEmit`) for typesjekk

---

## Kjøre prosjektet

```bash
# Installer avhengigheter
npm install

# Start dev server (port 3000)
npm run dev

# Bygg for produksjon
npm run build

# Forhåndsvis produksjonsbygg
npm run preview
```

## Miljøvariabler
Lag `.env.local` fil (ikke commit!):
```
GEMINI_API_KEY=din_gemini_api_nøkkel
```
