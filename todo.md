# todo.md - GeminiCraft Oppgaveliste

## Status-nøkkel
- [ ] Ikke startet
- [x] Fullført
- [~] Pågår

---

## Fullførte oppgaver

### Sprint 1 - Grunnleggende spill
- [x] Sett opp React + Three.js + Vite prosjekt
- [x] Implementer spiller-bevegelse (WASD + hopp)
- [x] Implementer blokkplassering og mining
- [x] Integrer Gemini API for teksturgenerering
- [x] Legg til hotbar UI for blokkvalg

### Sprint 2 - GitHub Deployment
- [x] Sett opp GitHub Actions workflow for GitHub Pages
- [x] Konfigurer Vite base URL for relative paths
- [x] Oppdater README med deployment-instruksjoner
- [x] Opprett context-filer (MEMORY, log, todo, bugs, MULTIPLAYER, CLAUDE)
- [x] Fikse hvit skjerm (GoogleGenAI top-level init, ErrorBoundary, CSS base-stiler)

---

## Kommende oppgaver

### Gameplay forbedringer
- [ ] Bedre teksturvisning på alle blokksider (ikke bare top)
- [ ] Legg til flere blokktyper (sand, snø, vann, lava)
- [ ] Lagre/laste verdenen (localStorage)
- [ ] Lyskilde fra blokker (glowing stone)
- [ ] Innenfor world bounds sjekk (ikke falle gjennom bakken)

### Teknisk gjeld
- [ ] Fjern ubrukte avhengigheter: `express`, `better-sqlite3`, `dotenv`
- [x] Legg til error boundary rundt 3D canvas
- [ ] Optimaliser blokkrendering med instancing (InstancedMesh)

### Multiplayer (se MULTIPLAYER.md)
- [ ] Legg til backend server (express + sqlite)
- [ ] WebSocket for real-time spillersynkronisering
- [ ] Delt verdenstilstand mellom spillere
