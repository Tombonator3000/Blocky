# bugs.md - GeminiCraft Bug Tracker

## Status-nøkkel
- 🔴 Kritisk
- 🟡 Moderat
- 🟢 Lav prioritet
- ✅ Fikset

---

## Aktive bugs

### 🟡 BUG-001: Blokk-kollisjon unøyaktig ved høyreklikk
**Beskrivelse:** Når man høyreklikker for å plassere en blokk, er `e.face.normal` ikke alltid tilgjengelig (kan være null), noe som kan forårsake at blokker ikke plasseres riktig.
**Fil:** `src/components/World.tsx:68` - `onContextMenu` handler
**Workaround:** Sjekk er lagt inn (`if (e.face)`), men blokkplassering kan feile stille
**Fix:** Legg til fallback-logikk eller vis feilmelding til bruker

### 🟢 BUG-002: Hotbar klikk låser ikke opp PointerLock
**Beskrivelse:** Hotbar-knappene har `onClick` men fungerer ikke som forventet når musen er låst (PointerLock aktiv). Bruker må trykke ESC for å låse opp musepekeren først.
**Fil:** `src/components/Game.tsx:39-51` - Hotbar div
**Workaround:** Instruksjon "Press ESC to unlock cursor" vises i UI
**Fix:** Håndter PointerLock exit/enter korrekt, eller bruk tastaturkortveiener for blokkvalg (1-5 taster)

### 🟢 BUG-003: Glasstekstur viser ikke transparens med AI-tekstur
**Beskrivelse:** Når en AI-generert tekstur er satt for 'glass'-blokk, mister blokken sin transparens da `meshStandardMaterial` sin `transparent` prop kolliderer med `map`.
**Fil:** `src/components/World.tsx:77-83`
**Fix:** Bruk `alphaMap` eller behold `transparent + opacity` uavhengig av om tekstur er satt

---

## Fikset bugs

### ✅ BUG-004: Hvit skjerm på GitHub Pages (kritisk)
**Beskrivelse:** Spillet viste hvit skjerm ved GitHub Pages-deployment.
**Årsak:** `GoogleGenAI`-konstruktøren kaster feil ved manglende API-nøkkel, og ble kalt på toppnivå i `gemini.ts`, noe som krasjet hele modulimport-kjeden.
**Fix:** Flyttet instansiering inn i funksjonen, lagt til guard for manglende nøkkel. Lagt til `ErrorBoundary` i `App.tsx` for fremtidige feil.

---

## Kjente begrensninger (ikke bugs)
- Teksturgenerering krever gyldig `GEMINI_API_KEY` - uten nøkkel brukes standard farger
- Verdenen genereres på nytt hver gang siden refreshes (ingen persistens)
- Max ~800 blokker før ytelsen kan forringes (ingen instancing ennå)
