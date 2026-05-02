import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import {
  Upload,
  X,
  Facebook,
  Instagram,
  Music2,
  Store,
  Sparkles,
  ArrowRight,
  UtensilsCrossed,
  Dumbbell,
  ShoppingBag,
  GraduationCap,
  Stethoscope,
  Briefcase,
  Home as HomeIcon,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/new")({
  head: () => ({
    meta: [
      { title: "New Publication — QubeSight" },
      { name: "description", content: "Compose a new social media publication with AI." },
    ],
  }),
  component: NewPublication,
});

const platforms = [
  { id: "instagram", label: "Instagram", reach: "Reels · Feed · Stories", icon: Instagram, on: true },
  { id: "facebook", label: "Facebook", reach: "Page · Reels", icon: Facebook, on: true },
  { id: "tiktok", label: "TikTok", reach: "Short video", icon: Music2, on: true },
  { id: "marketplace", label: "Marketplace", reach: "Product listing", icon: Store, on: false },
];

type BizType = "restaurant" | "gym" | "store" | "academy" | "clinic" | "service" | "realestate" | "other";

const businessTypes: { id: BizType; label: string; icon: any }[] = [
  { id: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
  { id: "gym", label: "Gym", icon: Dumbbell },
  { id: "store", label: "Store", icon: ShoppingBag },
  { id: "academy", label: "Academy", icon: GraduationCap },
  { id: "clinic", label: "Clinic", icon: Stethoscope },
  { id: "service", label: "Service", icon: Briefcase },
  { id: "realestate", label: "Real Estate", icon: HomeIcon },
  { id: "other", label: "Other", icon: MoreHorizontal },
];

function NewPublication() {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [drag, setDrag] = useState(false);
  const [bizType, setBizType] = useState<BizType>("restaurant");
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
    <div className="px-6 sm:px-10 py-12 max-w-[1400px] mx-auto">
      <header className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.35em] text-gold mb-3">Composition</p>
        <h1 className="font-display text-4xl sm:text-5xl text-cream">
          New <span className="italic text-gradient-gold">Publication</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Tell us about your business, upload your media, and let QubeSight AI craft the perfect
          post for every channel.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — main form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Business type */}
          <section className="bg-gradient-card border border-border/60 rounded-xl p-5 sm:p-7 shadow-soft">
            <h2 className="font-display text-2xl text-cream mb-1">Business Type</h2>
            <p className="text-xs text-muted-foreground mb-5">
              We tailor the AI tone & fields to your industry.
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
              {businessTypes.map((b) => {
                const active = bizType === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBizType(b.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 sm:p-4 rounded-lg border transition-all text-center",
                      active
                        ? "border-gold/50 bg-gold/10 shadow-gold-glow"
                        : "border-border/60 bg-obsidian/40 hover:border-gold/30 hover:bg-accent/30",
                    )}
                  >
                    <b.icon className={cn("h-5 w-5", active ? "text-gold" : "text-muted-foreground")} />
                    <span
                      className={cn(
                        "text-[11px] sm:text-xs font-medium tracking-wide",
                        active ? "text-cream" : "text-muted-foreground",
                      )}
                    >
                      {b.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Media upload */}
          <section className="bg-gradient-card border border-border/60 rounded-xl p-5 sm:p-7 shadow-soft">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display text-2xl text-cream">Photos & Video</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Up to 10 files · JPG, PNG, MP4
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
                "block border border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all relative overflow-hidden",
                drag
                  ? "border-gold bg-gold/5 shadow-gold-glow"
                  : "border-border/60 hover:border-gold/40 hover:bg-accent/20",
              )}
            >
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={onPick}
              />
              <div className="h-14 w-14 mx-auto rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                <Upload className="h-5 w-5 text-gold" />
              </div>
              <p className="font-display text-xl text-cream">Drop your media here</p>
              <p className="text-sm text-muted-foreground mt-2">
                or <span className="text-gold underline-offset-4 hover:underline">browse files</span>{" "}
                from your device
              </p>
            </label>

            {files.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-5">
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

          {/* Common + dynamic fields */}
          <section className="bg-gradient-card border border-border/60 rounded-xl p-5 sm:p-7 shadow-soft">
            <h2 className="font-display text-2xl text-cream mb-1">Publication Details</h2>
            <p className="text-xs text-muted-foreground mb-6">
              Fields adapt to your business type. The more detail, the better the AI output.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Title" full>
                <Input
                  placeholder={titleHint(bizType)}
                  className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
                />
              </Field>

              <Field label="Description" full>
                <Textarea
                  rows={3}
                  placeholder={descHint(bizType)}
                  className="bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
                />
              </Field>

              {/* Dynamic fields */}
              <DynamicFields type={bizType} />

              <Field label="Price / Offer (optional)">
                <Input
                  placeholder="$24 · 20% off · Free trial"
                  className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
                />
              </Field>

              <Field label="WhatsApp Contact">
                <Input
                  placeholder="+1 555 123 4567"
                  className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
                />
              </Field>
            </div>
          </section>
        </div>

        {/* Right — platforms */}
        <aside className="space-y-6">
          <section className="bg-gradient-card border border-border/60 rounded-xl p-5 sm:p-7 shadow-soft lg:sticky lg:top-6">
            <h2 className="font-display text-2xl text-cream mb-1">Channels</h2>
            <p className="text-xs text-muted-foreground mb-6">
              Select where this post will be published.
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
                  <Sparkles className="h-4 w-4" /> Generate with AI
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="luxury" size="lg" className="w-full">
                Save as Draft
              </Button>
            </div>

            <p className="text-[10px] text-center text-muted-foreground/70 uppercase tracking-[0.2em] mt-5">
              AI generation · ~10 seconds
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}

function titleHint(t: BizType) {
  const map: Record<BizType, string> = {
    restaurant: "Truffle Risotto — Chef's Special",
    gym: "Sunrise HIIT Class — Tuesday 7am",
    store: "Summer Collection — Now in Store",
    academy: "Intensive English Course — Spring Term",
    clinic: "Free Skin Check — Limited Slots",
    service: "Professional Home Cleaning",
    realestate: "Penthouse — 3BR Downtown",
    other: "What you want to share",
  };
  return map[t];
}

function descHint(t: BizType) {
  const map: Record<BizType, string> = {
    restaurant: "Describe the dish, ingredients, and the experience...",
    gym: "Class details, intensity level, what to bring...",
    store: "Highlight what's new, materials, sizes available...",
    academy: "Course outcomes, level, duration...",
    clinic: "Treatment details and what patients should expect...",
    service: "What's included, areas served, why choose you...",
    realestate: "Architectural details, neighborhood highlights...",
    other: "Tell your audience what this is about...",
  };
  return map[t];
}

function DynamicFields({ type }: { type: BizType }) {
  if (type === "restaurant") {
    return (
      <>
        <Field label="Dish Name">
          <Input
            placeholder="Truffle Risotto"
            className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
          />
        </Field>
        <Field label="Key Ingredients">
          <Input
            placeholder="Carnaroli rice, black truffle, parmesan"
            className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
          />
        </Field>
      </>
    );
  }
  if (type === "gym") {
    return (
      <>
        <Field label="Class Name">
          <Input
            placeholder="Sunrise HIIT"
            className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
          />
        </Field>
        <Field label="Schedule">
          <Input
            placeholder="Mon · Wed · Fri — 7:00am"
            className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
          />
        </Field>
        <Field label="Instructor" full>
          <Input
            placeholder="Coach Marcus Reyes"
            className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
          />
        </Field>
      </>
    );
  }
  if (type === "store") {
    return (
      <>
        <Field label="Product">
          <Input
            placeholder="Linen Summer Dress"
            className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
          />
        </Field>
        <Field label="Discount %">
          <Input
            placeholder="30"
            className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
          />
        </Field>
      </>
    );
  }
  if (type === "academy") {
    return (
      <>
        <Field label="Course Name">
          <Input
            placeholder="Intensive English B2"
            className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
          />
        </Field>
        <Field label="Duration">
          <Input
            placeholder="12 weeks"
            className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
          />
        </Field>
      </>
    );
  }
  if (type === "clinic") {
    return (
      <>
        <Field label="Treatment / Service">
          <Input
            placeholder="Annual Skin Check"
            className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
          />
        </Field>
        <Field label="Specialist">
          <Input
            placeholder="Dr. Lina Ortega"
            className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
          />
        </Field>
      </>
    );
  }
  if (type === "realestate") {
    return (
      <>
        <Field label="Property Type">
          <Input
            placeholder="Penthouse"
            className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
          />
        </Field>
        <Field label="Location">
          <Input
            placeholder="Downtown Miami"
            className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
          />
        </Field>
        <Field label="Bedrooms">
          <Input
            placeholder="3"
            className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
          />
        </Field>
        <Field label="Bathrooms">
          <Input
            placeholder="2"
            className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
          />
        </Field>
      </>
    );
  }
  if (type === "service") {
    return (
      <>
        <Field label="Service Name">
          <Input
            placeholder="Deep Home Cleaning"
            className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
          />
        </Field>
        <Field label="Service Area">
          <Input
            placeholder="Within 20 miles"
            className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
          />
        </Field>
      </>
    );
  }
  return (
    <Field label="Category" full>
      <Input
        placeholder="Tell us what you offer"
        className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
      />
    </Field>
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
