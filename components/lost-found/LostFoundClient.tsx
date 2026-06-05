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

export function LostFoundClient() {
  const { studentSession } = useSession();

  const [tab, setTab] = useState<LostFoundType>("lost");
  const [search, setSearch] = useState("");

  const [posts, setPosts] = useState<LostFoundPost[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

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
    const data = await listLostFound();
    setPosts(data || []);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return posts
      .filter((p) => p.type === tab)
      .filter(
        (p) =>
          !q ||
          p.product_name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
  }, [posts, tab, search]);

  const handlePost = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (!studentSession) return;

  try {
    let imageUrl =
      "https://placehold.co/400x300/e2e8f0/64748b?text=Item";

    if (file) {
      imageUrl = await uploadImage(file);
    }

    await createLostFoundPost({
      type: tab,
      product_name: name,
      description,
      location,
      contact_email: email,
      image_url: imageUrl,
      posted_by_sic: studentSession.user.sic_number,
    });

    setName("");
    setDescription("");
    setLocation("");
    setEmail("");

    resetPreview();
    setModalOpen(false);

    await refresh();
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Failed to upload image");
  }
};

  const locationLabel =
    tab === "lost"
      ? "Location Lost"
      : "Location Found";

  return (
    <div>
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

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="flex rounded-lg border border-slate-200 bg-white p-1">
          {(["lost", "found"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                tab === t
                  ? "bg-primary-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {t === "lost"
                ? "Lost Items"
                : "Found Items"}
            </button>
          ))}
        </div>

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            className="pl-10"
            placeholder="Search by name, description, or location..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Package}
          title={`No ${tab} items`}
          description="Be the first to post an item in this category."
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <ItemCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Post ${
          tab === "lost" ? "Lost" : "Found"
        } Item`}
        size="lg"
      >
        <form
          onSubmit={handlePost}
          className="space-y-4"
        >
          <div>
            <Label>Product Image</Label>

            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />

            <div className="relative mt-2 h-40 w-full overflow-hidden rounded-lg bg-slate-100">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>

          <div>
            <Label>Product Name</Label>

            <Input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />
          </div>

          <div>
            <Label>Description</Label>

            <Textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              required
            />
          </div>

          <div>
            <Label>{locationLabel}</Label>

            <Input
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              required
            />
          </div>

          <div>
            <Label>Contact Email</Label>

            <Input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
          >
            Publish Post
          </Button>
        </form>
      </Modal>
    </div>
  );
}