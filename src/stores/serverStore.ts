// serverStore.ts — Global Zustand store. Single source of truth for all server state.

import { create } from "zustand";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ServerType   = "vanilla" | "paper" | "fabric" | "forge" | "purpur";
export type ServerStatus = "online" | "offline" | "starting" | "stopping";

export interface ServerConfig {
  id:          string;       // Unique slug, e.g. "smp-world-1"
  name:        string;       // Display name, e.g. "SMP World"
  type:        ServerType;
  mcVersion:   string;       // e.g. "1.21.1"
  javaVersion: 8 | 17 | 21;
  ramMb:       number;       // e.g. 4096
  port:        number;       // e.g. 25565
  path:        string;       // Absolute path to server folder
  status:      ServerStatus;
  players:     string[];     // Online player names
  createdAt:   number;       // Unix timestamp ms
}

// ─── Store ────────────────────────────────────────────────────────────────────

interface ServerStore {
  servers:          ServerConfig[];
  selectedServerId: string | null;

  addServer:    (server: ServerConfig) => void;
  removeServer: (id: string) => void;
  updateServer: (id: string, patch: Partial<ServerConfig>) => void;
  selectServer: (id: string | null) => void;
  setStatus:    (id: string, status: ServerStatus) => void;
  setPlayers:   (id: string, players: string[]) => void;
}

export const useServerStore = create<ServerStore>((set) => ({
  servers:          [],
  selectedServerId: null,

  addServer: (server) =>
    set((s) => ({ servers: [...s.servers, server] })),

  removeServer: (id) =>
    set((s) => ({ servers: s.servers.filter((sv) => sv.id !== id) })),

  updateServer: (id, patch) =>
    set((s) => ({
      servers: s.servers.map((sv) => (sv.id === id ? { ...sv, ...patch } : sv)),
    })),

  selectServer: (id) => set({ selectedServerId: id }),

  setStatus: (id, status) =>
    set((s) => ({
      servers: s.servers.map((sv) => (sv.id === id ? { ...sv, status } : sv)),
    })),

  setPlayers: (id, players) =>
    set((s) => ({
      servers: s.servers.map((sv) => (sv.id === id ? { ...sv, players } : sv)),
    })),
}));
