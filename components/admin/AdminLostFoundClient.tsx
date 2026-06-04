"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  deleteLostFoundPost,
  listLostFound,
  markLostFoundReturned,
} from "@/lib/data/lost-found";
import type { LostFoundPost } from "@/types/database";
import { formatDate } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export function AdminLostFoundClient() {
  const [posts, setPosts] = useState<LostFoundPost[]>([]);
  const [selected, setSelected] = useState<LostFoundPost | null>(null);

  const refresh = useCallback(async () => {
    const data = await listLostFound();
    setPosts(data || []);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleMarkReturned = async (id: number) => {
    await markLostFoundReturned(id);
    await refresh();

    if (selected?.id === id) {
      setSelected({
        ...selected,
        status: "Returned",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this post?")) return;

    await deleteLostFoundPost(id);

    if (selected?.id === id) {
      setSelected(null);
    }

    await refresh();
  };

  return (
    <div>
      <PageHeader
        title="Lost & Found Management"
        description="Moderate posts and mark items as returned."
      />

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold">ID</th>
              <th className="px-4 py-3 text-left font-semibold">Type</th>
              <th className="px-4 py-3 text-left font-semibold">Product</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((p) => (
              <tr
                key={p.id}
                className="border-b border-slate-50 hover:bg-slate-50/50"
              >
                <td className="px-4 py-3 font-mono text-xs">
                  {p.id}
                </td>

                <td className="px-4 py-3 capitalize">
                  {p.type}
                </td>

                <td className="px-4 py-3 font-medium">
                  {p.product_name}
                </td>

                <td className="px-4 py-3">
                  <StatusBadge
                    status={p.status}
                    type="item"
                  />
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2 flex-wrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelected(p)}
                    >
                      View
                    </Button>

                    {p.status === "Active" && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          handleMarkReturned(p.id)
                        }
                      >
                        Mark Returned
                      </Button>
                    )}

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        handleDelete(p.id)
                      }
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

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Post Details"
        size="lg"
      >
        {selected && (
          <div className="space-y-4">
            <div className="relative h-48 rounded-lg overflow-hidden bg-slate-100">
              <Image
                src={selected.image_url}
                alt={selected.product_name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <p className="font-semibold text-lg">
              {selected.product_name}
            </p>

            <p className="text-slate-600">
              {selected.description}
            </p>

            <p>
              <span className="text-slate-500">
                Location:
              </span>{" "}
              {selected.location}
            </p>

            <p>
              <span className="text-slate-500">
                Email:
              </span>{" "}
              {selected.contact_email}
            </p>

            <p>
              <span className="text-slate-500">
                Status:
              </span>{" "}
              <StatusBadge
                status={selected.status}
                type="item"
              />
            </p>

            <p>
              <span className="text-slate-500">
                Posted:
              </span>{" "}
              {formatDate(selected.created_at)}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}