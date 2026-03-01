# log.md - GeminiCraft Development Log

## Format
`[YYYY-MM-DD HH:MM] Beskrivelse`

---

## 2026-03-01

### [2026-03-01 00:00] Prosjekt initialisert
- GeminiCraft prosjekt opprettet med React + Three.js + Gemini API
- Grunnleggende spillmekanikk: WASD bevegelse, Space for hopping, venstreklikk mine, høyreklikk plasser
- AI-teksturgenerering via Gemini 2.5 Flash Image

### [2026-03-01 00:01] GitHub Pages deployment satt opp
**Oppgave:** Gjøre spillet tilgjengelig direkte fra GitHub

**Endringer gjort:**
1. **Opprettet `.github/workflows/deploy.yml`** - GitHub Actions workflow som bygger og deployer til GitHub Pages automatisk ved push til `main`
2. **Oppdatert `vite.config.ts`** - La til `base: './'` for at assets bruker relative paths (nødvendig for GitHub Pages)
3. **Oppdatert `index.html`** - Endret tittel fra "My Google AI Studio App" til "GeminiCraft"
4. **Oppdatert `README.md`** - La til GitHub Pages-instruksjoner, oppsett av GitHub Secrets, og lenke til live demo
5. **Opprettet context-filer** - MEMORY.md, log.md, todo.md, bugs.md, MULTIPLAYER.md, CLAUDE.md

**Tekniske valg:**
- `base: './'` fremfor `/Blocky/` fordi relative paths ikke er hardkodet til repo-navn
- GitHub Actions bruker offisielle `actions/upload-pages-artifact@v3` og `actions/deploy-pages@v4`
- `GEMINI_API_KEY` hentes fra GitHub Secrets (valgfritt - spillet fungerer uten, bare teksturgenerering deaktiveres)
- Bruker `npm ci` (ikke `npm install`) for reproducerbare builds i CI

**Branch:** `claude/review-context-files-2l1ob`

---

### [2026-03-01 01:00] Fiks hvit skjerm på GitHub Pages
**Problem:** Spillet viste hvit skjerm fra GitHub Pages.

**Rotårsak:** `GoogleGenAI` ble initialisert på toppnivå i `gemini.ts`:
```typescript
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
```
Uten `GEMINI_API_KEY`-secret i GitHub kaster konstruktøren feilen:
`"API key must be set when using the Gemini API."`
Dette krasjet importkjeden: `App.tsx → Game.tsx → TextureGenerator.tsx → gemini.ts`, og React app-en klarte ikke å mounte. Resultat: hvit skjerm.

**Endringer:**
1. **`src/services/gemini.ts`** - Flyttet `GoogleGenAI`-instansiering inn i `generateBlockTexture`-funksjonen. Lagt til guard for manglende API-nøkkel.
2. **`src/App.tsx`** - Lagt til `ErrorBoundary` klasse-komponent som fanger render-feil og viser feilmelding istedenfor hvit skjerm.
3. **`src/index.css`** - Lagt til `html, body, #root { height: 100%; overflow: hidden; }` for korrekt full-skjerm layout.
4. **`vite.config.ts`** - `JSON.stringify(env.GEMINI_API_KEY || '')` for å sikre tom streng som fallback.

**Branch:** `claude/review-project-docs-Xstzk`
