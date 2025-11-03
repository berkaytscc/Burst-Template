## Stake Engine Burst Game Template

This template is a trimmed-down variant of the current project. It keeps the
Stake Engine connection flow, deterministic simulation hooks, and the UI frame
needed for burst-style games while stripping out every game-specific asset or
business rule.

### What you get

- Minimal Svelte + Vite setup ready to `npm install && npm run dev`
- Generic RGS client wrapper (`services/rgsClient.ts`) that shows where to plug
  Stake Engine endpoints in production and how to use the local mock service
  during prototyping
- Deterministic simulation helpers under `engine/` (fixed timestep loop,
  single-source RNG seed, and a neutral simulation hook)
- A reactive store that keeps the round timeline, balance, and configuration
  so components can stay presentation-only
- Skeleton UI in `App.svelte` with a loader overlay, generic command buttons
  and a debug panel for inspecting the latest simulated frames

### Quick start

```bash
cd temp/burst-template
npm install
npm run dev
```

The mock RGS client will fabricate responses using the deterministic seed that
you pick in the UI. Replace the logic inside `services/rgsClient.ts` with your
actual Stake Engine integration once you are ready to wire the game to a live
backend.

### Where to plug game logic

- `engine/simulation.ts`: implement your burst game core rules. The template
  exposes `runDeterministicStep` that receives the current frame state and a
  fixed timestep. Keep all side effects inside this function deterministic—only
  use the provided `Rng` helper so replays stay identical.
- `engine/burstLoop.ts`: orchestrates simulation ticks and transitions. Extend
  or replace this file when you need more complex sequencing (e.g. multi-phase
  rounds, bonus states, etc.).
- `components/` folder: add your actual game canvas, huds, dialogs. The current
  component files are intentionally minimal and demonstrate how to read from the
  shared store without hard-coding any theme.

### Recommended workflow

1. Start with the mock implementation and hard-coded seed to get your round
   logic deterministic.
2. Record the `simulationLog` emitted by the store and verify replays by
   resetting the seed.
3. When the game logic is stable, replace `mockBurstPlay` with real Stake
   Engine REST/Websocket calls. The store shape matches the responses returned
   by `stake-engine-client`, so migrating should be straightforward.
4. Copy the entire template folder into a new repository (or keep it here as a
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

Happy building! 🚀


