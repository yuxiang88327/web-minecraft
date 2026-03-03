# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Browser-based voxel sandbox game (Web Minecraft), built with vanilla JavaScript and Three.js. UI text is in Chinese (zh-CN).

## Running

Serve the directory with any static HTTP server (required for ES module imports):

```bash
npx serve .
# or: python -m http.server
```

Opening index.html directly via `file://` will NOT work due to ES module CORS restrictions.

No build system, no bundler, no package manager, no tests, no linter.

## Tech Stack

- Vanilla JavaScript ES modules (no TypeScript, no framework)
- Three.js v0.160.0 loaded via CDN import map in `index.html` (NOT npm)

## Project Structure

Three files total:

- `index.html` — Entry point; loads Three.js via CDN import map
- `style.css` — All UI styling (overlay, crosshair, debug HUD, hotbar)
- `game.js` — Entire game logic (~1030 lines, single ES module)

## Architecture (game.js)

All game code lives in a single file, organized as classes:

1. **TextureGen** — Procedurally generates 16×16 canvas textures for each block type (no image assets)
2. **SimpleNoise** — Seeded value noise with `noise2D()` and `octave2D()` for terrain height generation
3. **World** — Voxel data stored in flat `Uint8Array` (WORLD_SIZE × MAX_HEIGHT × WORLD_SIZE). Handles terrain generation, optimized mesh building with face culling, and DDA raycasting for block picking
4. **Player** — First-person controller with AABB collision detection, gravity, jump, sprint
5. **Game** — Main orchestrator: Three.js renderer/scene/lighting, custom GLSL sky shader, block interaction (break/place), hotbar UI, debug HUD, game loop

## Key Constants

```javascript
BLOCK = { AIR: 0, GRASS: 1, DIRT: 2, STONE: 3, SAND: 4, WATER: 5 }
WORLD_SIZE = 64      // x and z extent
MAX_HEIGHT = 32      // y extent
REACH_DISTANCE = 6   // block interaction range
```

## Development Notes

- The world rebuilds its entire mesh on every block change (no chunk system)
- Grass blocks use material groups for per-face textures (top/side/bottom)
- No save/load, no multiplayer — fixed 64×32×64 world grid
- Player physics: gravity -22, jump force 8, walk speed 4.5, sprint speed 7, height 1.7, eye height 1.6
