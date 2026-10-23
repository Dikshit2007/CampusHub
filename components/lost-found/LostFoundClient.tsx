
"use client";

import { uploadImage } from "@/lib/services/storage";
import { ItemCard } from "@/components/lost-found/ItemCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Modal } from "@/components/ui/Modal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Textarea } from "@/components/ui/Textarea";
import { useImagePreview } from "@/hooks/useImagePreview";
import {
  createLostFoundPost,
  listLostFound,
} from "@/lib/data/lost-found";
import type {
  LostFoundPost,
  LostFoundType,
} from "@/types/database";
import { useSession } from "@/providers/SessionProvider";
import { Package, Plus, Search } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Image from "next/image";
import { toast } from "sonner";

export function LostFoundClient() {
  const { studentSession } = useSession();

  const [tab, setTab] = useState<LostFoundType>("lost");
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<LostFoundPost[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    previewUrl,
    file,
    handleFileChange,
    resetPreview,
  } = useImagePreview();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");

  const refresh = useCallback(async () => {
    try {
      const data = await listLostFound();
      setPosts(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load listings.");
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return posts
      .filter(
        (post) =>
          String(post.type).toLowerCase() ===
          String(tab).toLowerCase()
      )
      .filter(
        (post) =>
          !q ||
          (post.product_name ?? "").toLowerCase().includes(q) ||
          (post.description ?? "").toLowerCase().includes(q) ||
          (post.location ?? "").toLowerCase().includes(q)
      );
  }, [posts, tab, search]);

  const handlePost = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!studentSession) {
      toast.error("Please log in to publish a post.");
      return;
    }

    if (!name.trim()) {
      toast.error("Item name is required.");
      return;
    }

    if (!description.trim()) {
      toast.error("Description is required.");
      return;
    }

    if (!location.trim()) {
      toast.error("Location is required.");
      return;
    }

    if (!email.trim()) {
      toast.error("Contact email is required.");
      return;
    }

    setSubmitting(true);

    try {
      let imageUrl =
        "https://placehold.co/400x300/e2e8f0/64748b?text=Item";

      if (file) {
        imageUrl = await uploadImage(file);
      }

      await createLostFoundPost({
        type: tab,
        product_name: name.trim(),
        description: description.trim(),
        location: location.trim(),
        contact_email: email.trim(),
        image_url: imageUrl,
        posted_by_sic: studentSession.user.sic_number,
      });

      setName("");
      setDescription("");
      setLocation("");
      setEmail("");

      resetPreview();
      setModalOpen(false);

      toast.success("Post published successfully!");

      await refresh();
    } catch (error) {
      console.error("Failed to publish Lost & Found post:", error);
      toast.error("Failed to publish post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const locationLabel =
    tab === "lost" ? "Location Lost" : "Location Found";

  return (
    <div className="w-full min-w-0">
      <PageHeader
        title="Lost & Found"
        description="Report lost items or post found belongings across campus."
        action={
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="mr-1 h-4 w-4" />
            Post {tab === "lost" ? "Lost" : "Found"} Item
          </Button>
        }
      />

      {/* Tabs and search */}
      <div className="mb-6 grid min-w-0 grid-cols-1 items-center gap-4 sm:grid-cols-[270px_minmax(0,1fr)]">
        <div className="grid grid-cols-2 rounded-lg border border-slate-200 bg-white p-1">
          {(["lost", "found"] as const).map((t) => {
            const active = tab === t;

            return (
              <button
                key={t}
                type="button"
                aria-pressed={active}
                onClick={() => setTab(t)}
                className={`min-h-10 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {t === "lost" ? "Lost Items" : "Found Items"}
              </button>
            );
          })}
        </div>

        <div className="relative min-w-0">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400"
          />

          <Input
            type="search"
            className="h-12 w-full pl-11 pr-4"
            placeholder="Search by name, description, or location..."
            aria-label="Search Lost & Found items"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Listings */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Package}
          title={`No ${tab} items`}
          description={
            search.trim()
              ? "Try a different search term."
              : "Be the first to post an item in this category."
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <ItemCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Create listing modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Post ${tab === "lost" ? "Lost" : "Found"} Item`}
        size="lg"
      >
        <form onSubmit={handlePost} className="space-y-4">
          <div>
            <Label>
              Product Image{" "}
              <span className="font-normal text-slate-400">
                (optional)
              </span>
            </Label>

            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />

            <div className="relative mt-2 h-40 w-full overflow-hidden rounded-lg bg-slate-100">
              <Image
                src={previewUrl}
                alt="Item image preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          <div>
            <Label>
              Item Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Scientific Calculator"
            />
          </div>

          <div>
            <Label>
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Describe the item in detail..."
            />
          </div>

          <div>
            <Label>
              {locationLabel}{" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="e.g. Library, Block-B Lab"
            />
          </div>

          <div>
            <Label>
              Contact Email <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your.email@college.edu"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={submitting}
          >
            {submitting ? "Publishing..." : "Publish Post"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
