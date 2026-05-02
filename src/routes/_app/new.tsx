import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import {
  Upload,
  X,
  Image as ImageIcon,
  Facebook,
  Instagram,
  Music2,
  Store,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/new")({
  head: () => ({
    meta: [
      { title: "New Publication — QubeSight" },
      { name: "description", content: "Compose a new luxury property publication across all platforms." },
    ],
  }),
  component: NewPublication,
});

const platforms = [
  { id: "instagram", label: "Instagram", reach: "Reels · Feed · Stories", icon: Instagram, on: true },
  { id: "facebook", label: "Facebook", reach: "Page · Reels", icon: Facebook, on: true },
  { id: "tiktok", label: "TikTok", reach: "Video composition", icon: Music2, on: true },
  { id: "marketplace", label: "Marketplace", reach: "Listing syndication", icon: Store, on: false },
];

function NewPublication() {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [drag, setDrag] = useState(false);
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(platforms.map((p) => [p.id, p.on])),
  );

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const list = Array.from(e.dataTransfer.files).slice(0, 10);
    setFiles((prev) => [
      ...prev,
      ...list.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })),
    ]);
  }, []);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? []);
    setFiles((prev) => [
      ...prev,
      ...list.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })),
    ]);
  };

  return (
    <div className="px-10 py-12 max-w-[1400px] mx-auto">
      <header className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.35em] text-gold mb-3">Composition</p>
        <h1 className="font-display text-5xl text-cream">
          New <span className="italic text-gradient-gold">Publication</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Upload photography, define the property, and let QubeSight orchestrate the perfect
          announcement across every channel.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — main form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Photo upload */}
          <section className="bg-gradient-card border border-border/60 rounded-xl p-7 shadow-soft">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display text-2xl text-cream">Photography</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Up to 10 images · JPG, PNG, WEBP · 4K recommended
                </p>
              </div>
              <span className="text-xs text-gold/80 tracking-wider">{files.length} / 10</span>
            </div>

            <label
              onDragOver={(e) => {
                e.preventDefault();
                setDrag(true);
              }}
              onDragLeave={() => setDrag(false)}
              onDrop={onDrop}
              className={cn(
                "block border border-dashed rounded-xl p-12 text-center cursor-pointer transition-all relative overflow-hidden",
                drag
                  ? "border-gold bg-gold/5 shadow-gold-glow"
                  : "border-border/60 hover:border-gold/40 hover:bg-accent/20",
              )}
            >
              <input type="file" multiple accept="image/*" className="hidden" onChange={onPick} />
              <div className="h-14 w-14 mx-auto rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                <Upload className="h-5 w-5 text-gold" />
              </div>
              <p className="font-display text-xl text-cream">Drag your finest shots here</p>
              <p className="text-sm text-muted-foreground mt-2">
                or <span className="text-gold underline-offset-4 hover:underline">browse</span> from
                your atelier
              </p>
            </label>

            {files.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                {files.map((f, i) => (
                  <div
                    key={i}
                    className="relative group aspect-square rounded-lg overflow-hidden border border-border/60"
                  >
                    <img src={f.url} alt={f.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent" />
                    {i === 0 && (
                      <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider bg-gradient-gold text-obsidian px-2 py-0.5 rounded-sm font-semibold">
                        Cover
                      </span>
                    )}
                    <button
                      onClick={() => setFiles(files.filter((_, k) => k !== i))}
                      className="absolute top-2 right-2 h-7 w-7 rounded-full bg-obsidian/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-destructive"
                    >
                      <X className="h-3.5 w-3.5 text-cream" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Property details */}
          <section className="bg-gradient-card border border-border/60 rounded-xl p-7 shadow-soft">
            <h2 className="font-display text-2xl text-cream mb-1">Property Details</h2>
            <p className="text-xs text-muted-foreground mb-6">
              Precise details elevate the composition AI generates.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Listing Title" full>
                <Input
                  defaultValue="Penthouse Avenue Foch — Triplex 480m²"
                  className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
                />
              </Field>

              <Field label="Asking Price">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold font-display text-lg">
                    €
                  </span>
                  <Input
                    defaultValue="18,500,000"
                    className="h-11 pl-8 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
                  />
                </div>
              </Field>

              <Field label="Property Type">
                <Select defaultValue="penthouse">
                  <SelectTrigger className="h-11 bg-input border-border/60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="hotel">Hôtel Particulier</SelectItem>
                    <SelectItem value="apartment">Appartement</SelectItem>
                    <SelectItem value="estate">Estate</SelectItem>
                    <SelectItem value="chalet">Chalet</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Location" full>
                <Input
                  defaultValue="16ème arrondissement, Paris"
                  className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
                />
              </Field>

              <Field label="Bedrooms">
                <Input
                  defaultValue="6"
                  className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
                />
              </Field>

              <Field label="Bathrooms">
                <Input
                  defaultValue="5"
                  className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
                />
              </Field>

              <Field label="Brief Notes (optional)" full>
                <Textarea
                  rows={3}
                  placeholder="Highlight architectural details, provenance, or unique features…"
                  className="bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
                />
              </Field>
            </div>
          </section>
        </div>

        {/* Right — platforms */}
        <aside className="space-y-6">
          <section className="bg-gradient-card border border-border/60 rounded-xl p-7 shadow-soft sticky top-6">
            <h2 className="font-display text-2xl text-cream mb-1">Channels</h2>
            <p className="text-xs text-muted-foreground mb-6">
              Select where this composition will be published.
            </p>

            <div className="space-y-3">
              {platforms.map((p) => (
                <div
                  key={p.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg border transition-all",
                    enabled[p.id]
                      ? "border-gold/40 bg-gold/5"
                      : "border-border/60 bg-obsidian/40 opacity-70",
                  )}
                >
                  <div
                    className={cn(
                      "h-10 w-10 rounded-lg flex items-center justify-center transition",
                      enabled[p.id]
                        ? "bg-gradient-gold text-obsidian"
                        : "bg-accent text-muted-foreground",
                    )}
                  >
                    <p.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-cream">{p.label}</p>
                    <p className="text-[11px] text-muted-foreground">{p.reach}</p>
                  </div>
                  <Switch
                    checked={enabled[p.id]}
                    onCheckedChange={(v) => setEnabled((s) => ({ ...s, [p.id]: v }))}
                    className="data-[state=checked]:bg-gold"
                  />
                </div>
              ))}
            </div>

            <div className="hairline my-6" />

            <div className="space-y-3">
              <Button variant="gold" size="lg" className="w-full" asChild>
                <Link to="/preview">
                  <Sparkles className="h-4 w-4" /> Generate AI Composition
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="luxury" size="lg" className="w-full">
                Save as Draft
              </Button>
            </div>

            <p className="text-[10px] text-center text-muted-foreground/70 uppercase tracking-[0.2em] mt-5">
              AI composition · ~12 seconds
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={cn("space-y-2", full && "sm:col-span-2")}>
      <Label className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}
