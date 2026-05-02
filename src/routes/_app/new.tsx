import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
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

const WEBHOOK_URL = "https://qubesightprojects.fun/webhook/publicar-propiedad";

async function parseWebhookResponse(res: Response) {
  const body = await res.text();
  if (!body) return null;
  try {
    return JSON.parse(body);
  } catch {
    return { raw: body };
  }
}

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

const dynamicFieldsConfig: Record<BizType, { key: string; label: string; placeholder: string; full?: boolean }[]> = {
  restaurant: [
    { key: "dish_name", label: "Dish Name", placeholder: "Truffle Risotto" },
    { key: "ingredients", label: "Key Ingredients", placeholder: "Carnaroli rice, black truffle, parmesan" },
  ],
  gym: [
    { key: "class_name", label: "Class Name", placeholder: "Sunrise HIIT" },
    { key: "schedule", label: "Schedule", placeholder: "Mon · Wed · Fri — 7:00am" },
    { key: "instructor", label: "Instructor", placeholder: "Coach Marcus Reyes", full: true },
  ],
  store: [
    { key: "product", label: "Product", placeholder: "Linen Summer Dress" },
    { key: "discount", label: "Discount %", placeholder: "30" },
  ],
  academy: [
    { key: "course_name", label: "Course Name", placeholder: "Intensive English B2" },
    { key: "duration", label: "Duration", placeholder: "12 weeks" },
  ],
  clinic: [
    { key: "treatment", label: "Treatment / Service", placeholder: "Annual Skin Check" },
    { key: "specialist", label: "Specialist", placeholder: "Dr. Lina Ortega" },
  ],
  realestate: [
    { key: "property_type", label: "Property Type", placeholder: "Penthouse" },
    { key: "location", label: "Location", placeholder: "Downtown Miami" },
    { key: "bedrooms", label: "Bedrooms", placeholder: "3" },
    { key: "bathrooms", label: "Bathrooms", placeholder: "2" },
  ],
  service: [
    { key: "service_name", label: "Service Name", placeholder: "Deep Home Cleaning" },
    { key: "service_area", label: "Service Area", placeholder: "Within 20 miles" },
  ],
  other: [
    { key: "category", label: "Category", placeholder: "Tell us what you offer", full: true },
  ],
};

type UploadedFile = { name: string; url: string; file: File };

function NewPublication() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [drag, setDrag] = useState(false);
  const [bizType, setBizType] = useState<BizType>("restaurant");
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(platforms.map((p) => [p.id, p.on])),
  );
  const [fields, setFields] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (k: string, v: string) => setFields((s) => ({ ...s, [k]: v }));

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const list = Array.from(e.dataTransfer.files).slice(0, 10);
    setFiles((prev) => [
      ...prev,
      ...list.map((f) => ({ name: f.name, url: URL.createObjectURL(f), file: f })),
    ]);
  }, []);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? []);
    setFiles((prev) => [
      ...prev,
      ...list.map((f) => ({ name: f.name, url: URL.createObjectURL(f), file: f })),
    ]);
  };

  const handleGenerate = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("business_type", bizType);
      fd.append("title", fields.title ?? "");
      fd.append("description", fields.description ?? "");
      fd.append("price", fields.price ?? "");
      fd.append("whatsapp", fields.whatsapp ?? "");
      for (const f of dynamicFieldsConfig[bizType]) {
        fd.append(f.key, fields[f.key] ?? "");
      }
      const selectedPlatforms = Object.keys(enabled).filter((k) => enabled[k]);
      fd.append("platforms", JSON.stringify(selectedPlatforms));
      files.forEach((f, i) => {
        fd.append(`files`, f.file, f.file.name);
        if (i === 0) fd.append("cover", f.file, f.file.name);
      });

      // Mark loading state in sessionStorage so /preview shows the spinner
      sessionStorage.setItem("qs_pub_loading", "1");
      sessionStorage.removeItem("qs_pub_response");
      sessionStorage.removeItem("qs_pub_error");
      sessionStorage.setItem("qs_pub_business_type", bizType);

      // Navigate immediately — preview page will display the spinner
      navigate({ to: "/preview" });

      // Fire the request in the background; preview polls sessionStorage
      fetch(WEBHOOK_URL, { method: "POST", body: fd })
        .then(async (res) => {
          const data = await parseWebhookResponse(res);
          if (!res.ok) {
            const message = data?.error ?? data?.message ?? data?.raw ?? res.statusText;
            throw new Error(`Generation failed (${res.status}): ${message}`);
          }
          sessionStorage.setItem("qs_pub_response", JSON.stringify(data));
          sessionStorage.removeItem("qs_pub_loading");
          window.dispatchEvent(new Event("qs_pub_update"));
        })
        .catch((err) => {
          sessionStorage.setItem(
            "qs_pub_error",
            err?.message ?? "Generation failed. Please try again.",
          );
          sessionStorage.removeItem("qs_pub_loading");
          window.dispatchEvent(new Event("qs_pub_update"));
        });
    } catch (err: any) {
      toast.error("Generation failed", { description: err?.message ?? "Please try again." });
      setSubmitting(false);
    }
  };

  const dyn = dynamicFieldsConfig[bizType];

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
                  value={fields.title ?? ""}
                  onChange={(e) => setField("title", e.target.value)}
                  placeholder={titleHint(bizType)}
                  className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
                />
              </Field>

              <Field label="Description" full>
                <Textarea
                  rows={3}
                  value={fields.description ?? ""}
                  onChange={(e) => setField("description", e.target.value)}
                  placeholder={descHint(bizType)}
                  className="bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
                />
              </Field>

              {dyn.map((f) => (
                <Field key={f.key} label={f.label} full={f.full}>
                  <Input
                    value={fields[f.key] ?? ""}
                    onChange={(e) => setField(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
                  />
                </Field>
              ))}

              <Field label="Price / Offer (optional)">
                <Input
                  value={fields.price ?? ""}
                  onChange={(e) => setField("price", e.target.value)}
                  placeholder="$24 · 20% off · Free trial"
                  className="h-11 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
                />
              </Field>

              <Field label="WhatsApp Contact">
                <Input
                  value={fields.whatsapp ?? ""}
                  onChange={(e) => setField("whatsapp", e.target.value)}
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
              <Button
                variant="gold"
                size="lg"
                className="w-full"
                onClick={handleGenerate}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Generating…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> Generate with AI
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
              <Button variant="luxury" size="lg" className="w-full" disabled={submitting}>
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
