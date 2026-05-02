import { createFileRoute, Link } from "@tanstack/react-router";
import {
  TrendingUp,
  Building2,
  Share2,
  Sparkles,
  ArrowUpRight,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — QubeSight" },
      { name: "description", content: "Overview of your luxury real estate publications and performance." },
    ],
  }),
  component: Dashboard,
});

const stats = [
  {
    label: "Posts Published",
    value: "1,284",
    delta: "+12.4%",
    icon: TrendingUp,
    note: "vs. previous quarter",
  },
  {
    label: "Properties Active",
    value: "47",
    delta: "+6 this week",
    icon: Building2,
    note: "across 4 ateliers",
  },
  {
    label: "Platforms Connected",
    value: "4 / 4",
    delta: "All healthy",
    icon: Share2,
    note: "Meta · TikTok · Marketplace",
  },
  {
    label: "AI Compositions",
    value: "318",
    delta: "+48 today",
    icon: Sparkles,
    note: "drafted this month",
  },
];

const activity = [
  {
    type: "published",
    title: "Penthouse Avenue Foch — Triplex 480m²",
    meta: "Published to Instagram, Facebook, TikTok",
    time: "2 minutes ago",
    price: "€18,500,000",
  },
  {
    type: "scheduled",
    title: "Villa Cap Ferrat — Waterfront Estate",
    meta: "Scheduled for tomorrow, 09:00 CET",
    time: "1 hour ago",
    price: "€42,000,000",
  },
  {
    type: "drafted",
    title: "Hôtel Particulier Saint-Germain",
    meta: "AI composition ready for review",
    time: "3 hours ago",
    price: "€12,800,000",
  },
  {
    type: "published",
    title: "Loft Marais — Atelier d'Artiste 220m²",
    meta: "Published to Marketplace, Facebook",
    time: "Yesterday",
    price: "€3,950,000",
  },
];

const iconFor = (t: string) =>
  t === "published" ? CheckCircle2 : t === "scheduled" ? Clock : Sparkles;

function Dashboard() {
  return (
    <div className="px-10 py-12 max-w-[1400px] mx-auto">
      {/* Header */}
      <header className="flex items-end justify-between mb-12 flex-wrap gap-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold mb-3">
            Tuesday · 12 November
          </p>
          <h1 className="font-display text-5xl text-cream tracking-tight">
            Bonsoir, <span className="italic text-gradient-gold">Alexandre</span>
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Your atelier published 14 listings this week. Three compositions await your final review.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="luxury" size="lg" asChild>
            <Link to="/preview">
              <Eye className="h-4 w-4" /> Review Drafts
            </Link>
          </Button>
          <Button variant="gold" size="lg" asChild>
            <Link to="/new">
              <Plus className="h-4 w-4" /> New Publication
            </Link>
          </Button>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-14">
        {stats.map((s) => (
          <article
            key={s.label}
            className="group relative bg-gradient-card border border-border/60 rounded-xl p-6 shadow-soft hover:border-gold/30 transition-all overflow-hidden"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gold/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-start justify-between mb-6 relative">
              <div className="h-10 w-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                <s.icon className="h-4 w-4 text-gold" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold/80 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> {s.delta}
              </span>
            </div>
            <p className="font-display text-4xl text-cream mb-1 relative">{s.value}</p>
            <p className="text-sm text-cream/80 font-medium relative">{s.label}</p>
            <p className="text-xs text-muted-foreground mt-2 relative">{s.note}</p>
          </article>
        ))}
      </section>

      {/* Activity + Performance */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent activity */}
        <div className="lg:col-span-2 bg-gradient-card border border-border/60 rounded-xl p-7 shadow-soft">
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="font-display text-2xl text-cream">Recent Activity</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Live feed across all connected channels
              </p>
            </div>
            <button className="text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-soft transition">
              View all
            </button>
          </div>

          <div className="space-y-1">
            {activity.map((a, i) => {
              const Icon = iconFor(a.type);
              return (
                <div
                  key={i}
                  className="group flex items-start gap-4 p-4 rounded-lg hover:bg-accent/40 transition-colors border-b border-border/40 last:border-0"
                >
                  <div className="h-10 w-10 rounded-full bg-obsidian border border-gold/20 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-cream font-medium text-[15px] truncate">{a.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{a.meta}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-display text-gradient-gold text-base">{a.price}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance card */}
        <div className="bg-gradient-card border border-border/60 rounded-xl p-7 shadow-soft relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-gold/5 blur-3xl" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">Atelier Performance</p>
          <h3 className="font-display text-2xl text-cream mb-6">This Quarter</h3>

          <div className="space-y-5 relative">
            {[
              { label: "Engagement Rate", value: 8.4, suffix: "%" },
              { label: "Reach (M)", value: 12.7, suffix: "M" },
              { label: "Inquiries", value: 342, suffix: "" },
            ].map((m) => (
              <div key={m.label}>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-sm text-muted-foreground">{m.label}</span>
                  <span className="font-display text-xl text-cream">
                    {m.value}
                    <span className="text-gold text-sm ml-0.5">{m.suffix}</span>
                  </span>
                </div>
                <div className="h-1 bg-obsidian rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-gold rounded-full"
                    style={{ width: `${Math.min(100, m.value * 7)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border/40 relative">
            <p className="text-xs text-muted-foreground mb-3">Top performing listing</p>
            <p className="font-display text-cream text-lg leading-tight">
              Penthouse Avenue Foch
            </p>
            <p className="text-gradient-gold font-display text-2xl mt-1">€18.5M</p>
          </div>
        </div>
      </section>
    </div>
  );
}
