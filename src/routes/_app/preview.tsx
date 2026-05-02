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
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/preview")({
  head: () => ({
    meta: [
      { title: "AI Preview — QubeSight" },
      { name: "description", content: "Review AI-generated posts before publishing." },
    ],
  }),
  component: PreviewPage,
});

const initial = {
  instagram: {
    icon: Instagram,
    label: "Instagram",
    body:
      "✨ Tonight's Chef's Special: Truffle Risotto ✨\n\nSlow-stirred Carnaroli rice, shaved black truffle, aged parmesan — finished tableside.\n\nLimited servings. Reserve your table now.\n\n📍 Bella Vita Trattoria\n📞 WhatsApp: +1 555 123 4567\n\n#truffle #risotto #italianfood #finedining #chefspecial #foodie",
  },
  facebook: {
    icon: Facebook,
    label: "Facebook",
    body:
      "Tonight only at Bella Vita Trattoria — our signature Truffle Risotto is back.\n\nMade with imported Carnaroli rice, freshly shaved black truffle, and 24-month aged Parmigiano-Reggiano. Slow-stirred for 22 minutes the traditional way.\n\nOnly 18 servings available tonight. Reserve via WhatsApp: +1 555 123 4567",
  },
  tiktok: {
    icon: Music2,
    label: "TikTok",
    body:
      "POV: the truffle risotto comes out of the kitchen 🍄✨\n\nSlow-stirred 22 minutes. Shaved tableside. The smell hits before it lands.\n\nOnly 18 servings tonight 🔥\n\n#truffle #risotto #foodtok #pov #fyp #italianfood #chefslife",
  },
  marketplace: {
    icon: Store,
    label: "Marketplace",
    body:
      "Truffle Risotto — Chef's Special\n\nBella Vita Trattoria · Tonight only\n\nCarnaroli rice · Black truffle · Aged parmesan · 22-min slow stir\n\nDine-in: $34 · Takeaway available\n\nReserve: +1 555 123 4567",
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
    <div className="px-6 sm:px-10 py-12 max-w-[1400px] mx-auto">
      <header className="flex items-end justify-between mb-10 flex-wrap gap-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold mb-3 flex items-center gap-2">
            <Sparkles className="h-3 w-3" /> AI Generation Ready
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-cream">
            Preview & <span className="italic text-gradient-gold">Refine</span>
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Each post is tailored to the voice of its channel. Review, edit, and publish to all
            platforms with one click.
          </p>
        </div>
        <Button
          variant="gold"
          size="xl"
          onClick={() => setPublished(true)}
          disabled={published}
          className="min-w-[200px]"
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
          <div className="flex gap-1.5 p-1.5 bg-card/60 border border-border/60 rounded-xl overflow-x-auto">
            {platforms.map((key) => {
              const p = texts[key];
              const Icon = p.icon;
              const isActive = active === key;
              return (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={cn(
                    "flex-1 min-w-fit flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm transition-all",
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
                className="bg-gradient-card border border-border/60 rounded-xl p-5 sm:p-7 shadow-soft"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-display text-xl text-cream">{p.label} Post</p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-gold/80">
                        AI · tone-tuned
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
                    {p.body.length} characters
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

        {/* Right — video preview */}
        <aside className="lg:col-span-2 space-y-6">
          {/* Video card */}
          <section className="bg-gradient-card border border-border/60 rounded-xl p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-display text-lg text-cream">TikTok Video</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold/80">
                  AI-generated · 24s
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
                    "linear-gradient(180deg, oklch(0.16 0.005 80 / 0.2) 0%, oklch(0.16 0.005 80 / 0.85) 100%), url(https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=900&q=85)",
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
                  Truffle Risotto
                </p>
                <p className="text-gradient-gold font-display text-xl">$34 · Tonight only</p>
              </div>

              <div className="absolute top-3 right-3 flex flex-col gap-3 text-cream/90">
                <div className="flex flex-col items-center gap-0.5">
                  <Heart className="h-5 w-5" />
                  <span className="text-[10px]">8.2k</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-[10px]">142</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <Share2 className="h-5 w-5" />
                  <span className="text-[10px]">64</span>
                </div>
              </div>

              {/* Progress shimmer */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-obsidian/80">
                <div className="h-full w-1/3 bg-gradient-gold shimmer" />
              </div>
            </div>

            <Button variant="luxury" size="lg" className="w-full mt-4">
              <Download className="h-4 w-4" /> Download Video
            </Button>
          </section>

          {/* Schedule card */}
          <section className="bg-gradient-card border border-border/60 rounded-xl p-6 shadow-soft">
            <p className="font-display text-lg text-cream mb-1">Best Time to Post</p>
            <p className="text-xs text-muted-foreground mb-5">
              Optimal engagement window detected by QubeSight AI.
            </p>

            <div className="flex items-center justify-between p-4 rounded-lg bg-obsidian/60 border border-gold/20">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Recommended</p>
                <p className="font-display text-cream text-xl mt-0.5">7:42 PM</p>
                <p className="text-xs text-muted-foreground mt-0.5">Today, Tuesday</p>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-gold">Auto</span>
            </div>

            <p className="text-[10px] text-center text-muted-foreground/70 uppercase tracking-[0.2em] mt-4">
              Estimated reach · 12k qualified
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
