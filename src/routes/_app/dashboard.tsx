import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  TrendingUp,
  Megaphone,
  Share2,
  Sparkles,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  Clock,
  Facebook,
  Instagram,
  Music2,
  Store,
  Crown,
  MoreHorizontal,
  Eye,
  Copy,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — QubeSight" },
      { name: "description", content: "Overview of your social media publications and performance." },
    ],
  }),
  component: Dashboard,
});

const stats = [
  {
    label: "Posts This Month",
    value: "0",
    delta: "—",
    icon: TrendingUp,
    note: "no activity yet",
  },
  {
    label: "Active Campaigns",
    value: "0",
    delta: "—",
    icon: Megaphone,
    note: "none scheduled",
  },
  {
    label: "Connected Platforms",
    value: "0 / 4",
    delta: "Connect to start",
    icon: Share2,
    note: "Instagram · Facebook · TikTok",
  },
  {
    label: "AI Generations",
    value: "0",
    delta: "—",
    icon: Sparkles,
    note: "no drafts yet",
  },
];

const platformIcon = (p: string) => {
  if (p === "instagram") return Instagram;
  if (p === "facebook") return Facebook;
  if (p === "tiktok") return Music2;
  return Store;
};

type Publication = {
  id: string;
  title: string;
  type: string;
  thumb: string;
  platforms: string[];
  status: string;
  statusType: "published" | "scheduled" | "draft";
  time: string;
};

const initialPublications: Publication[] = [
  {
    id: "p1",
    title: "Truffle Risotto — Chef's Special",
    type: "Restaurant",
    thumb: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80",
    platforms: ["instagram", "facebook", "tiktok"],
    status: "Published",
    statusType: "published",
    time: "2 minutes ago",
  },
  {
    id: "p2",
    title: "Sunrise HIIT — Tuesday 7am",
    type: "Gym",
    thumb: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    platforms: ["instagram", "facebook"],
    status: "Scheduled",
    statusType: "scheduled",
    time: "Tomorrow, 06:30",
  },
  {
    id: "p3",
    title: "Summer Collection — 30% Off",
    type: "Store",
    thumb: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80",
    platforms: ["instagram", "facebook", "tiktok", "marketplace"],
    status: "Draft",
    statusType: "draft",
    time: "Awaiting review",
  },
  {
    id: "p4",
    title: "English Course — Enrollment Open",
    type: "Academy",
    thumb: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
    platforms: ["facebook", "instagram"],
    status: "Published",
    statusType: "published",
    time: "Yesterday",
  },
];

const statusStyles: Record<string, string> = {
  published: "bg-gold/10 text-gold border-gold/30",
  scheduled: "bg-cream/5 text-cream/80 border-border",
  draft: "bg-muted text-muted-foreground border-border",
};

function Dashboard() {
  const navigate = useNavigate();
  const [publications, setPublications] = useState<Publication[]>(initialPublications);
  const [toDelete, setToDelete] = useState<Publication | null>(null);

  const handleOpen = (p: Publication) => {
    toast.success(`Opening "${p.title}"`);
    navigate({ to: "/preview" });
  };

  const handleDuplicate = (p: Publication) => {
    const copy: Publication = {
      ...p,
      id: `${p.id}-copy-${Date.now()}`,
      title: `${p.title} (Copy)`,
      status: "Draft",
      statusType: "draft",
      time: "Just now",
    };
    setPublications((prev) => {
      const idx = prev.findIndex((x) => x.id === p.id);
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });
    toast.success("Publication duplicated");
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    setPublications((prev) => prev.filter((x) => x.id !== toDelete.id));
    toast.success(`"${toDelete.title}" deleted`);
    setToDelete(null);
  };

  return (
    <div className="px-6 sm:px-10 py-12 max-w-[1400px] mx-auto pb-32">
      {/* Header */}
      <header className="flex items-end justify-between mb-12 flex-wrap gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Bella Vita Trattoria</p>
            <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-gradient-gold text-obsidian font-semibold">
              <Crown className="h-3 w-3" /> Pro Plan
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl text-cream tracking-tight">
            Good evening, <span className="italic text-gradient-gold">Erlibby</span>
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            You published 14 posts this week across 3 platforms. Three drafts are awaiting your review.
          </p>
        </div>
        <Button variant="gold" size="lg" asChild className="hidden sm:inline-flex">
          <Link to="/new">
            <Plus className="h-4 w-4" /> New Publication
          </Link>
        </Button>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 mb-14">
        {stats.map((s) => (
          <article
            key={s.label}
            className="group relative bg-gradient-card border border-border/60 rounded-xl p-5 sm:p-6 shadow-soft hover:border-gold/30 transition-all overflow-hidden"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gold/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-start justify-between mb-5 relative">
              <div className="h-10 w-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                <s.icon className="h-4 w-4 text-gold" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold/80 hidden sm:flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> {s.delta}
              </span>
            </div>
            <p className="font-display text-3xl sm:text-4xl text-cream mb-1 relative">{s.value}</p>
            <p className="text-sm text-cream/80 font-medium relative">{s.label}</p>
            <p className="text-xs text-muted-foreground mt-2 relative hidden sm:block">{s.note}</p>
          </article>
        ))}
      </section>

      {/* Recent publications */}
      <section className="bg-gradient-card border border-border/60 rounded-xl p-5 sm:p-7 shadow-soft">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h2 className="font-display text-2xl text-cream">Recent Publications</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Your latest posts across all connected channels
            </p>
          </div>
          <button className="text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-soft transition">
            View all
          </button>
        </div>

        <div className="space-y-2">
          {publications.map((p, i) => {
            const StatusIcon =
              p.statusType === "published" ? CheckCircle2 : p.statusType === "scheduled" ? Clock : Sparkles;
            return (
              <div
                key={i}
                className="group flex items-center gap-4 p-3 sm:p-4 rounded-lg hover:bg-accent/40 transition-colors border border-transparent hover:border-border/60"
              >
                {/* Thumb */}
                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-lg overflow-hidden border border-border/60 shrink-0">
                  <img src={p.thumb} alt={p.title} className="h-full w-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-cream font-medium text-[15px] truncate">{p.title}</p>
                  <p className="text-[11px] uppercase tracking-wider text-gold/80 mt-0.5">
                    {p.type}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    {p.platforms.map((pl) => {
                      const Icon = platformIcon(pl);
                      return (
                        <div
                          key={pl}
                          className="h-5 w-5 rounded-full bg-obsidian border border-border/60 flex items-center justify-center"
                        >
                          <Icon className="h-2.5 w-2.5 text-cream/70" />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-right shrink-0 hidden sm:block">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] uppercase tracking-wider",
                      statusStyles[p.statusType],
                    )}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {p.status}
                  </span>
                  <p className="text-[11px] text-muted-foreground mt-1.5">{p.time}</p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="h-9 w-9 shrink-0 rounded-md flex items-center justify-center text-cream/60 hover:text-gold hover:bg-gold/5 border border-transparent hover:border-gold/20 transition-colors focus:outline-none focus:ring-1 focus:ring-gold/40"
                      aria-label={`Actions for ${p.title}`}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44">
                    <DropdownMenuItem onClick={() => handleOpen(p)}>
                      <Eye className="h-4 w-4" /> Open
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicate(p)}>
                      <Copy className="h-4 w-4" /> Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setToDelete(p)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAB */}
      <Link
        to="/new"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold-glow hover:scale-105 active:scale-95 transition-transform"
        aria-label="New Publication"
      >
        <Plus className="h-6 w-6 text-obsidian" />
      </Link>

      {/* Delete confirmation */}
      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">Delete this publication?</AlertDialogTitle>
            <AlertDialogDescription>
              {toDelete ? `"${toDelete.title}" will be permanently removed. This action cannot be undone.` : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
