import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Facebook,
  Instagram,
  Music2,
  Store,
  Pencil,
  Sparkles,
  Play,
  Send,
  Heart,
  MessageCircle,
  Share2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/preview")({
  head: () => ({
    meta: [
      { title: "AI Preview — QubeSight" },
      { name: "description", content: "Review AI-composed posts before publishing across channels." },
    ],
  }),
  component: PreviewPage,
});

const initial = {
  instagram: {
    icon: Instagram,
    label: "Instagram",
    body:
      "Discrétion absolue, Avenue Foch.\n\nUn triplex de 480 m² inonde Paris d'une lumière dorée — six chambres, marbres rares, ascenseur privé, terrasse panoramique sur l'Arc de Triomphe.\n\nUne adresse qui ne se nomme pas. Une vie qui ne se raconte qu'en privé.\n\n€18,500,000 · Visite sur invitation.\n\n#LuxuryRealEstate #ParisLuxury #Penthouse #AvenueFoch #PrivateListing",
  },
  facebook: {
    icon: Facebook,
    label: "Facebook",
    body:
      "Une rareté absolue dans le 16ème arrondissement.\n\nNous avons l'honneur de présenter un triplex d'exception de 480 m² Avenue Foch — 6 chambres, 5 salles d'eau, terrasse de 120 m² avec vue panoramique sur l'Arc de Triomphe.\n\nProvenance prestigieuse · finitions sur-mesure · ascenseur privatif.\n\n€18,500,000 — Visite uniquement sur dossier.",
  },
  tiktok: {
    icon: Music2,
    label: "TikTok",
    body:
      "POV: you're stepping into Paris' most discreet penthouse 🥂\n\n480m² · 6 bedrooms · panoramic Arc de Triomphe views\n\nThe address only the right people know about.\n\n€18.5M ✨\n\n#luxuryhomes #parislife #realestatetiktok #penthouse #milliondollarlisting",
  },
  marketplace: {
    icon: Store,
    label: "Marketplace",
    body:
      "Penthouse Triplex — Avenue Foch, 75116 Paris\n\n480 m² · 6 chambres · 5 sdb · Terrasse 120 m²\n\nTriplex d'exception en dernier étage avec ascenseur privatif. Vue panoramique sur l'Arc de Triomphe et le Trocadéro. Marbres de Carrare, parquet Versailles, cuisine sur-mesure.\n\nServices: concierge 24/7, parking 3 voitures, cave.\n\nPrix : €18,500,000",
  },
};

type PlatformKey = keyof typeof initial;

function PreviewPage() {
  const [texts, setTexts] = useState(initial);
  const [editing, setEditing] = useState<PlatformKey | null>(null);
  const [active, setActive] = useState<PlatformKey>("instagram");
  const [published, setPublished] = useState(false);

  const platforms = Object.keys(initial) as PlatformKey[];

  return (
    <div className="px-10 py-12 max-w-[1400px] mx-auto">
      <header className="flex items-end justify-between mb-10 flex-wrap gap-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold mb-3 flex items-center gap-2">
            <Sparkles className="h-3 w-3" /> AI Composition Ready
          </p>
          <h1 className="font-display text-5xl text-cream">
            Preview & <span className="italic text-gradient-gold">Refine</span>
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Each composition has been tailored to the voice of its channel. Review, edit, and
            publish at your discretion.
          </p>
        </div>
        <Button
          variant="gold"
          size="xl"
          onClick={() => setPublished(true)}
          disabled={published}
          className="min-w-[220px]"
        >
          {published ? (
            <>
              <Check className="h-4 w-4" /> Publishing…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Publish All
            </>
          )}
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left — platform tabs + text editors */}
        <div className="lg:col-span-3 space-y-5">
          {/* Platform tabs */}
          <div className="flex gap-2 p-1.5 bg-card/60 border border-border/60 rounded-xl">
            {platforms.map((key) => {
              const p = texts[key];
              const Icon = p.icon;
              const isActive = active === key;
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm transition-all",
                    isActive
                      ? "bg-gradient-gold text-obsidian font-semibold shadow-gold-glow"
                      : "text-muted-foreground hover:text-cream hover:bg-accent/40",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Editor */}
          {platforms.map((key) => {
            if (active !== key) return null;
            const p = texts[key];
            const Icon = p.icon;
            const isEditing = editing === key;
            return (
              <article
                key={key}
                className="bg-gradient-card border border-border/60 rounded-xl p-7 shadow-soft"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-display text-xl text-cream">{p.label} Composition</p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-gold/80">
                        AI · refined for tone
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={isEditing ? "gold" : "luxury"}
                    size="sm"
                    onClick={() => setEditing(isEditing ? null : key)}
                  >
                    {isEditing ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Save
                      </>
                    ) : (
                      <>
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </>
                    )}
                  </Button>
                </div>

                {isEditing ? (
                  <Textarea
                    value={p.body}
                    onChange={(e) =>
                      setTexts((t) => ({ ...t, [key]: { ...t[key], body: e.target.value } }))
                    }
                    rows={12}
                    className="bg-obsidian/60 border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40 leading-relaxed text-[15px]"
                  />
                ) : (
                  <p className="text-cream/90 whitespace-pre-line leading-relaxed text-[15px] font-light">
                    {p.body}
                  </p>
                )}

                <div className="flex items-center justify-between pt-5 mt-5 border-t border-border/40">
                  <p className="text-xs text-muted-foreground">
                    {p.body.length} characters · ~{Math.ceil(p.body.split(/\s+/).length / 200)} min
                    read
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                    <span className="text-[11px] uppercase tracking-wider text-gold">Ready</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Right — video preview & social card */}
        <aside className="lg:col-span-2 space-y-6">
          {/* Video card */}
          <section className="bg-gradient-card border border-border/60 rounded-xl p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-display text-lg text-cream">Cinematic Reel</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold/80">
                  AI-composed · 28s
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-gold/10 text-gold border border-gold/20">
                4K · 9:16
              </span>
            </div>

            <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-obsidian border border-border/60 group">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, oklch(0.16 0.005 80 / 0.2) 0%, oklch(0.16 0.005 80 / 0.85) 100%), url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=85)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="h-16 w-16 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform">
                  <Play className="h-5 w-5 text-obsidian fill-obsidian ml-0.5" />
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Now showing</p>
                <p className="font-display text-cream text-lg leading-tight">
                  Penthouse Avenue Foch
                </p>
                <p className="text-gradient-gold font-display text-2xl">€18,500,000</p>
              </div>

              <div className="absolute top-3 right-3 flex flex-col gap-3 text-cream/90">
                <div className="flex flex-col items-center gap-0.5">
                  <Heart className="h-5 w-5" />
                  <span className="text-[10px]">12.4k</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-[10px]">284</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <Share2 className="h-5 w-5" />
                  <span className="text-[10px]">96</span>
                </div>
              </div>

              {/* Progress shimmer */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-obsidian/80">
                <div className="h-full w-1/3 bg-gradient-gold shimmer" />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                { l: "Music", v: "Atelier" },
                { l: "Cuts", v: "14" },
                { l: "Hook", v: "0:02" },
              ].map((s) => (
                <div key={s.l} className="p-2.5 rounded-md bg-obsidian/60 border border-border/40">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {s.l}
                  </p>
                  <p className="font-display text-cream text-sm mt-0.5">{s.v}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Schedule card */}
          <section className="bg-gradient-card border border-border/60 rounded-xl p-6 shadow-soft">
            <p className="font-display text-lg text-cream mb-1">Publication Window</p>
            <p className="text-xs text-muted-foreground mb-5">
              Optimal engagement detected by QubeSight intelligence.
            </p>

            <div className="flex items-center justify-between p-4 rounded-lg bg-obsidian/60 border border-gold/20">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Recommended</p>
                <p className="font-display text-cream text-xl mt-0.5">19:42 CET</p>
                <p className="text-xs text-muted-foreground mt-0.5">Today, Tuesday</p>
              </div>
              <Switch defaultChecked className="data-[state=checked]:bg-gold" />
            </div>

            <p className="text-[10px] text-center text-muted-foreground/70 uppercase tracking-[0.2em] mt-4">
              Estimated reach · 1.2M qualified
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
