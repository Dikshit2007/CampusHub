"use client";

import type {
  AuthorizedRepresentative,
  Complaint,
  LostFoundPost,
  MarketplaceListing,
  User,
} from "@/types/database";
import { MOCK_DATA_KEY } from "@/lib/constants";
import {
  SEED_AUTHORIZED_REPS,
  SEED_COMPLAINTS,
  SEED_LOST_FOUND,
  SEED_MARKETPLACE,
  SEED_PASSWORDS,
  SEED_USERS,
} from "./seed";

export interface MockStore {
  users: User[];
  passwords: Record<string, string>;
  authorizedReps: AuthorizedRepresentative[];
  complaints: Complaint[];
  lostFound: LostFoundPost[];
  marketplace: MarketplaceListing[];
}

function defaultStore(): MockStore {
  return {
    users: [...SEED_USERS],
    passwords: { ...SEED_PASSWORDS },
    authorizedReps: [...SEED_AUTHORIZED_REPS],
    complaints: [...SEED_COMPLAINTS],
    lostFound: [...SEED_LOST_FOUND],
    marketplace: [...SEED_MARKETPLACE],
  };
}

export function getMockStore(): MockStore {
  if (typeof window === "undefined") {
    return defaultStore();
  }
  const raw = localStorage.getItem(MOCK_DATA_KEY);
  if (!raw) {
    const store = defaultStore();
    localStorage.setItem(MOCK_DATA_KEY, JSON.stringify(store));
    return store;
  }
  try {
    return JSON.parse(raw) as MockStore;
  } catch {
    const store = defaultStore();
    localStorage.setItem(MOCK_DATA_KEY, JSON.stringify(store));
    return store;
  }
}

export function saveMockStore(store: MockStore): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(MOCK_DATA_KEY, JSON.stringify(store));
}

export function resetMockStore(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(MOCK_DATA_KEY);
}


