import { createFileRoute, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
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
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
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

const WEBHOOK_URL = "https://qubesightprojects.fun/api/publicar";

async function parseWebhookResponse(res: Response) {
  const body = await res.text();
  if (!body) return null;
  try {
    return JSON.parse(body);
  } catch {
    return { raw: body };
  }
}

const platformMeta = {
  instagram: { icon: Instagram, label: "Instagram" },
  facebook: { icon: Facebook, label: "Facebook" },
  tiktok: { icon: Music2, label: "TikTok" },
  marketplace: { icon: Store, label: "Marketplace" },
} as const;

type PlatformKey = keyof typeof platformMeta;

const fallbackTexts: Record<PlatformKey, string> = {
  instagram: "",
  facebook: "",
  tiktok: "",
  marketplace: "",
};

function extractTexts(ai: any): Record<PlatformKey, string> {
  if (!ai) return fallbackTexts;
  const src = ai.texts ?? ai.posts ?? ai;
  return {
    instagram: src?.instagram ?? src?.Instagram ?? src?.ig ?? "",
    facebook: src?.facebook ?? src?.Facebook ?? src?.fb ?? "",
    tiktok: src?.tiktok ?? src?.TikTok ?? src?.tt ?? "",
    marketplace: src?.marketplace ?? src?.Marketplace ?? "",
  };
}

function PreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const stateFromRoute = (location.state ?? {}) as { aiResponse?: any };

  const [aiResponse, setAiResponse] = useState<any>(() => {
    if (stateFromRoute.aiResponse) return stateFromRoute.aiResponse;
    if (typeof window === "undefined") return null;
    const stored = sessionStorage.getItem("qs_pub_response");
    return stored ? JSON.parse(stored) : null;
  });
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sync = () => {
      const err = sessionStorage.getItem("qs_pub_error");
      if (err) {
        setLoadError(err);
        return;
      }
      const stored = sessionStorage.getItem("qs_pub_response");
      if (stored) {
        try {
          setAiResponse(JSON.parse(stored));
          setLoadError(null);
        } catch {
          /* noop */
        }
      }
    };
    sync();
    window.addEventListener("qs_pub_update", sync);
    const interval = window.setInterval(sync, 1000);
    return () => {
      window.removeEventListener("qs_pub_update", sync);
      window.clearInterval(interval);
    };
  }, []);

  const initialTexts = useMemo(() => extractTexts(aiResponse), [aiResponse]);
  const videoUrl: string | undefined =
    aiResponse?.video_url ?? aiResponse?.videoUrl ?? aiResponse?.video?.url;
  const videoThumb: string | undefined =
    aiResponse?.video_thumbnail ?? aiResponse?.thumbnail ?? aiResponse?.cover_url;

  const [texts, setTexts] = useState(initialTexts);
  useEffect(() => {
    setTexts(extractTexts(aiResponse));
  }, [aiResponse]);
  const [editing, setEditing] = useState<PlatformKey | null>(null);
  const [active, setActive] = useState<PlatformKey>("instagram");
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const platforms = Object.keys(platformMeta) as PlatformKey[];

  const isLoading = !aiResponse && !loadError;

  const handlePublishAll = async () => {
    if (publishing || published) return;
    setPublishing(true);
    try {
      const fd = new FormData();
      fd.append("action", "publish");
      fd.append("texts", JSON.stringify(texts));
      if (videoUrl) fd.append("video_url", videoUrl);
      if (aiResponse?.id) fd.append("publication_id", String(aiResponse.id));

      const res = await fetch(WEBHOOK_URL, { method: "POST", body: fd });
      const data = await parseWebhookResponse(res);
      if (!res.ok) {
        const message = data?.error ?? data?.message ?? data?.raw ?? res.statusText;
        throw new Error(`Publish failed (${res.status}): ${message}`);
      }
      setPublished(true);
      toast.success("Published to all platforms");
    } catch (err: any) {
      toast.error("Publish failed", { description: err?.message ?? "Please try again." });
    } finally {
      setPublishing(false);
    }
  };

  if (loadError) {
    return (
      <div className="px-6 sm:px-10 py-12 max-w-[1400px] mx-auto">
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-destructive mb-3">
            Generation failed
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-cream">
            Something went <span className="italic text-gradient-gold">wrong</span>
          </h1>
          <p className="mt-3 text-muted-foreground max-w-md">{loadError}</p>
          <Button
            variant="gold"
            size="lg"
            className="mt-8"
            onClick={() => {
              sessionStorage.removeItem("qs_pub_error");
              navigate({ to: "/new" });
            }}
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="px-6 sm:px-10 py-12 max-w-[1400px] mx-auto">
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <div className="relative h-20 w-20 mb-8">
            <div className="absolute inset-0 rounded-full bg-gold/10 border border-gold/20 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-gold animate-spin" />
            </div>
          </div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold mb-3 flex items-center gap-2">
            <Sparkles className="h-3 w-3" /> QubeSight AI
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-cream">
            Crafting your <span className="italic text-gradient-gold">publication</span>
          </h1>
          <p className="mt-3 text-muted-foreground max-w-md">
            We're tuning the voice for every channel. This usually takes about 10 seconds.
          </p>
        </div>
      </div>
    );
  }

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
          onClick={handlePublishAll}
          disabled={publishing || published}
          className="min-w-[200px]"
        >
          {published ? (
            <>
              <Check className="h-4 w-4" /> Published
            </>
          ) : publishing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Publishing…
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
          <div className="flex gap-1.5 p-1.5 bg-card/60 border border-border/60 rounded-xl overflow-x-auto">
            {platforms.map((key) => {
              const Icon = platformMeta[key].icon;
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
                  <span className="hidden sm:inline">{platformMeta[key].label}</span>
                </button>
              );
            })}
          </div>

          {platforms.map((key) => {
            if (active !== key) return null;
            const meta = platformMeta[key];
            const Icon = meta.icon;
            const body = texts[key];
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
                      <p className="font-display text-xl text-cream">{meta.label} Post</p>
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
                    value={body}
                    onChange={(e) =>
                      setTexts((t) => ({ ...t, [key]: e.target.value }))
                    }
                    rows={12}
                    className="bg-obsidian/60 border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40 leading-relaxed text-[15px]"
                  />
                ) : body ? (
                  <p className="text-cream/90 whitespace-pre-line leading-relaxed text-[15px] font-light">
                    {body}
                  </p>
                ) : (
                  <p className="text-muted-foreground italic text-sm">
                    No copy generated for this channel yet.
                  </p>
                )}

                <div className="flex items-center justify-between pt-5 mt-5 border-t border-border/40">
                  <p className="text-xs text-muted-foreground">
                    {body.length} characters
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
              {videoUrl ? (
                <video
                  src={videoUrl}
                  poster={videoThumb}
                  controls
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: videoThumb
                        ? `linear-gradient(180deg, oklch(0.16 0.005 80 / 0.2) 0%, oklch(0.16 0.005 80 / 0.85) 100%), url(${videoThumb})`
                        : "linear-gradient(180deg, oklch(0.16 0.005 80 / 0.2) 0%, oklch(0.16 0.005 80 / 0.85) 100%), url(https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=900&q=85)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="h-16 w-16 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform">
                      <Play className="h-5 w-5 text-obsidian fill-obsidian ml-0.5" />
                    </button>
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

                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-obsidian/80">
                    <div className="h-full w-1/3 bg-gradient-gold shimmer" />
                  </div>
                </>
              )}
            </div>

            <Button
              variant="luxury"
              size="lg"
              className="w-full mt-4"
              asChild={!!videoUrl}
              disabled={!videoUrl}
            >
              {videoUrl ? (
                <a href={videoUrl} download target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" /> Download Video
                </a>
              ) : (
                <span>
                  <Download className="h-4 w-4" /> No video available
                </span>
              )}
            </Button>
          </section>

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
