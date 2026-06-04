"use client";

import type { CreateListingInput } from "@/types/auth";
import type { MarketplaceListing } from "@/types/database";
import { getMockStore, saveMockStore } from "@/lib/data/mock/store";
import { generateId } from "@/lib/utils";

export function listMarketplaceListings(): MarketplaceListing[] {
  return [...getMockStore().marketplace].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function getListingById(id: string): MarketplaceListing | undefined {
  return getMockStore().marketplace.find((l) => l.id === id);
}

export function createListing(input: CreateListingInput): MarketplaceListing {
  const store = getMockStore();
  const listing: MarketplaceListing = {
    id: generateId("MK"),
    product_name: input.product_name,
    description: input.description,
    category: input.category,
    price: input.price,
    contact_email: input.contact_email,
    image_url: input.image_url,
    posted_by_sic: input.posted_by_sic,
    moderated: false,
    is_spam: false,
    created_at: new Date().toISOString(),
  };
  store.marketplace.unshift(listing);
  saveMockStore(store);
  return listing;
}

export function deleteListing(id: string): boolean {
  const store = getMockStore();
  store.marketplace = store.marketplace.filter((l) => l.id !== id);
  saveMockStore(store);
  return true;
}

export function moderateListing(id: string): MarketplaceListing | undefined {
  const store = getMockStore();
  const idx = store.marketplace.findIndex((l) => l.id === id);
  if (idx === -1) return undefined;
  store.marketplace[idx] = { ...store.marketplace[idx], moderated: true };
  saveMockStore(store);
  return store.marketplace[idx];
}

export function markListingSpam(id: string): MarketplaceListing | undefined {
  const store = getMockStore();
  const idx = store.marketplace.findIndex((l) => l.id === id);
  if (idx === -1) return undefined;
  store.marketplace[idx] = {
    ...store.marketplace[idx],
    is_spam: true,
    moderated: true,
  };
  saveMockStore(store);
  return store.marketplace[idx];
}

export function getMarketplaceCount(): number {
  return getMockStore().marketplace.length;
}
