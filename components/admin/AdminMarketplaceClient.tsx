"use client";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  deleteListing,
  listMarketplaceListings,
  markListingSpam,
  moderateListing,
} from "@/lib/data/marketplace";
import type { MarketplaceListing } from "@/types/database";
import { formatDate, formatPrice } from "@/lib/utils";
import { useCallback, useState } from "react";
import Image from "next/image";

export function AdminMarketplaceClient() {
  const [listings, setListings] = useState(() => listMarketplaceListings());
  const [selected, setSelected] = useState<MarketplaceListing | null>(null);

  const refresh = useCallback(() => setListings(listMarketplaceListings()), []);

  return (
    <div>
      <PageHeader
        title="Marketplace Management"
        description="Moderate listings, remove spam, and manage student marketplace posts."
      />
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold">ID</th>
              <th className="px-4 py-3 text-left font-semibold">Product</th>
              <th className="px-4 py-3 text-left font-semibold">Category</th>
              <th className="px-4 py-3 text-left font-semibold">Price</th>
              <th className="px-4 py-3 text-left font-semibold">Moderated</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((l) => (
              <tr key={l.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-4 py-3 font-mono text-xs">{l.id}</td>
                <td className="px-4 py-3 font-medium">{l.product_name}</td>
                <td className="px-4 py-3">{l.category}</td>
                <td className="px-4 py-3">{formatPrice(l.price)}</td>
                <td className="px-4 py-3">
                  {l.moderated ? (
                    <span className="text-green-600 text-xs font-medium">Yes</span>
                  ) : (
                    <span className="text-amber-600 text-xs font-medium">Pending</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2 flex-wrap">
                    <Button variant="ghost" size="sm" onClick={() => setSelected(l)}>View</Button>
                    {!l.moderated && (
                      <Button variant="secondary" size="sm" onClick={() => { moderateListing(l.id); refresh(); }}>
                        Moderate
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => { markListingSpam(l.id); refresh(); }}>
                      Remove Spam
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        if (confirm("Delete listing?")) {
                          deleteListing(l.id);
                          refresh();
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Listing Details" size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="relative h-48 rounded-lg overflow-hidden bg-slate-100">
              <Image src={selected.image_url} alt={selected.product_name} fill className="object-cover" unoptimized />
            </div>
            <p className="font-semibold text-lg">{selected.product_name}</p>
            <p>{formatPrice(selected.price)} · {selected.category}</p>
            <p className="text-slate-600">{selected.description}</p>
            <p>{selected.contact_email}</p>
            <p className="text-slate-500 text-xs">Posted {formatDate(selected.created_at)}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
