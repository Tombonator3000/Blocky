<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# GeminiCraft

A Minecraft-like voxel game in the browser, powered by Google Gemini AI for texture generation.

**Play it live on GitHub Pages:** https://Tombonator3000.github.io/Blocky/

## Controls

| Key | Action |
|-----|--------|
| `W A S D` | Move |
| `Space` | Jump |
| Left Click | Mine block |
| Right Click | Place block |
| `ESC` | Unlock cursor (to use UI) |

## Play Online (GitHub Pages)

The game is automatically deployed to GitHub Pages on every push to `main`.

> **Note:** AI texture generation requires a Gemini API key configured as a GitHub Secret.
> The game runs fully without it — blocks just use default colors.

## Deploy to Your Own GitHub Pages

1. **Fork this repository**

2. **Enable GitHub Pages:**
   - Go to your repo → **Settings** → **Pages**
   - Under *Source*, select **GitHub Actions**

3. **(Optional) Add Gemini API key for AI textures:**
   - Go to your repo → **Settings** → **Secrets and variables** → **Actions**
   - Add a new secret: `GEMINI_API_KEY` = your key from [Google AI Studio](https://aistudio.google.com/apikey)

4. **Push to `main`** — the workflow will build and deploy automatically.

   Or trigger manually: **Actions** → **Deploy to GitHub Pages** → **Run workflow**

## Run Locally

**Prerequisites:** Node.js 18+

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env.local` and add your Gemini API key (optional):
   ```
   GEMINI_API_KEY=your_key_here
   ```

3. Run the dev server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## Tech Stack

- **React 19** + **TypeScript**
- **Three.js** via `@react-three/fiber` for 3D rendering
- **Cannon.js** via `@react-three/cannon` for physics
- **Google Gemini 2.5 Flash** for AI texture generation
- **Zustand** for state management
- **Vite** + **Tailwind CSS**

## View in AI Studio

https://ai.studio/apps/1248ad8f-ced2-4ed6-a035-3336ab676c09
