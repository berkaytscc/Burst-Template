## Stake Engine Burst Game Template

This template is a trimmed-down variant of the current project. It keeps the
Stake Engine connection flow, UI frame needed for burst-style games while stripping out 
every game-specific asset or business rule.

### Overview

- Minimal Svelte + Vite setup ready to `npm install && npm run dev`
- Generic RGS client wrapper (`services/rgsClient.ts`) that shows where to plug
  Stake Engine endpoints in production and how to use the local mock service
  during prototyping
- A reactive store that keeps the round timeline, balance, and configuration
  so components can stay presentation-only

### Quick start

```bash
npm install
npm run dev
```

The mock RGS client will fabricate responses using the deterministic seed that
you pick in the UI. Replace the logic inside `services/rgsClient.ts` with your
actual Stake Engine integration once you are ready to wire the game to a live
backend.

### Recommended workflow
1. When the game logic is stable, replace `mockBurstPlay` with real Stake
   Engine REST/Websocket calls. The store shape matches the responses returned
   by `stake-engine-client`, so migrating should be straightforward.
2. Copy the entire template folder into a new repository (or keep it here as a
   reusable skeleton) whenever you spin up a new burst title.

### Notes

- The template intentionally avoids any assets, copy, or payout logic from the
  current project. Everything under `public/assets` is empty on purpose.
- All dates, brands, and marks are placeholders. Update them to match the new
  game before shipping.
- Keep your deterministic game logic under version control—replay drift usually
  comes from unsynchronised RNG calls or floating-point usage. The helper in
  `engine/simulation.ts` uses fixed-point math; feel free to swap it with your
  own implementation as long as the determinism contract is preserved.


