export type BurstStatus = 'idle' | 'authenticating' | 'ready' | 'playing' | 'error';

export interface BurstConfig {
  seed: string;
  fixedDtMs: number;
  maxFrames: number;
  baseStake: number;
}

export type SerializableState = Record<string, unknown>;

export interface SimulationFrame {
  frame: number;
  timeMs: number;
  state: SerializableState;
  events: string[];
}

export interface BurstSession {
  sessionId: string;
  rgsUrl: string;
  currency: string;
  balance: number;
}

export interface BurstRoundResult {
  frames: SimulationFrame[];
  payout: number;
  finalState: SerializableState;
  seed: string;
  runtimeMs: number;
}

export interface BurstStoreState {
  status: BurstStatus;
  session: BurstSession | null;
  config: BurstConfig;
  simulationLog: SimulationFrame[];
  lastRound: BurstRoundResult | null;
  error: string | null;
}


