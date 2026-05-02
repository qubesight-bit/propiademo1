import { createFileRoute } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Music2,
  Check,
  Crown,
  Mail,
  Building,
  Tag,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — QubeSight" },
      { name: "description", content: "Manage connected accounts, subscription, and business profile." },
    ],
  }),
  component: SettingsPage,
});

const accounts = [
  {
    icon: Instagram,
    label: "Instagram Business",
    handle: "@bellavita.trattoria",
    connected: true,
    since: "Connected since Mar 2024",
  },
  {
    icon: Facebook,
    label: "Facebook Page",
    handle: "Bella Vita Trattoria",
    connected: true,
    since: "Connected since Mar 2024",
  },
  {
    icon: Music2,
    label: "TikTok",
    handle: "@bellavita.eats",
    connected: true,
    since: "Connected since Aug 2024",
  },
];

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "$20",
    note: "Solo businesses",
    features: [
      "Up to 30 posts / month",
      "2 connected platforms",
      "Standard AI text generation",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$35",
    note: "Most popular",
    features: [
      "Unlimited posts",
      "All 4 platforms",
      "AI video generation",
      "Smart scheduling",
      "Priority support",
    ],
    current: true,
  },
];

function SettingsPage() {
  return (
    <div className="px-6 sm:px-10 py-12 max-w-[1400px] mx-auto">
      <header className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.35em] text-gold mb-3">Account</p>
        <h1 className="font-display text-4xl sm:text-5xl text-cream">
          Settings & <span className="italic text-gradient-gold">Preferences</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Manage your business profile, connected accounts, and subscription.
        </p>
      </header>

      <div className="space-y-10">
        {/* Profile */}
        <section className="bg-gradient-card border border-border/60 rounded-xl p-5 sm:p-7 shadow-soft">
          <div className="flex items-start justify-between mb-7 flex-wrap gap-4">
            <div>
              <h2 className="font-display text-2xl text-cream">Business Profile</h2>
              <p className="text-xs text-muted-foreground mt-1">
                The identity behind every publication.
              </p>
            </div>
            <Button variant="luxury" size="sm">
              Save changes
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8">
            <div className="flex flex-col items-center gap-3">
              <div className="h-28 w-28 rounded-full bg-gradient-gold flex items-center justify-center text-obsidian font-display text-3xl shadow-gold-glow">
                BV
              </div>
              <button className="text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-soft transition">
                Change logo
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ProfileField
                icon={Building}
                label="Business Name"
                defaultValue="Bella Vita Trattoria"
              />
              <ProfileField icon={Tag} label="Category" defaultValue="Restaurant — Italian" />
              <ProfileField
                icon={Mail}
                label="Notification Email"
                defaultValue="erlibbylugo@qubesight.lat"
              />
              <ProfileField icon={Bell} label="Brand Voice" defaultValue="Warm · authentic · inviting" />
            </div>
          </div>
        </section>

        {/* Connected accounts */}
        <section className="bg-gradient-card border border-border/60 rounded-xl p-5 sm:p-7 shadow-soft">
          <div className="mb-7">
            <h2 className="font-display text-2xl text-cream">Connected Accounts</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Manage where QubeSight publishes on your behalf.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accounts.map((a) => (
              <div
                key={a.label}
                className={cn(
                  "flex items-center gap-4 p-5 rounded-lg border transition-all",
                  a.connected
                    ? "border-gold/30 bg-gold/[0.03]"
                    : "border-border/60 bg-obsidian/40 hover:border-gold/30",
                )}
              >
                <div
                  className={cn(
                    "h-12 w-12 rounded-lg flex items-center justify-center shrink-0",
                    a.connected
                      ? "bg-gradient-gold text-obsidian"
                      : "bg-accent text-muted-foreground",
                  )}
                >
                  <a.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-cream">{a.label}</p>
                    {a.connected && (
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-gold">
                        <Check className="h-3 w-3" /> Live
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-cream/80 truncate">{a.handle}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{a.since}</p>
                </div>
                <Button variant={a.connected ? "ghost" : "gold"} size="sm">
                  {a.connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Subscription */}
        <section>
          <div className="mb-6 flex items-end justify-between flex-wrap gap-3">
            <div>
              <h2 className="font-display text-2xl text-cream">Subscription</h2>
              <p className="text-xs text-muted-foreground mt-1">
                You're currently on the <span className="text-gold">Pro</span> plan.
              </p>
            </div>
            <p className="text-xs text-muted-foreground tracking-wider">
              Next renewal · 14 December 2026
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
            {plans.map((p) => (
              <div
                key={p.id}
                className={cn(
                  "relative rounded-xl p-7 border transition-all",
                  p.current
                    ? "bg-gradient-card border-gold/50 shadow-gold-glow"
                    : "bg-card/60 border-border/60 hover:border-gold/30",
                )}
              >
                {p.current && (
                  <span className="absolute -top-3 left-7 text-[10px] uppercase tracking-[0.25em] bg-gradient-gold text-obsidian px-3 py-1 rounded-sm font-semibold flex items-center gap-1">
                    <Crown className="h-3 w-3" /> Current
                  </span>
                )}
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-3">{p.note}</p>
                <h3 className="font-display text-3xl text-cream">{p.name}</h3>
                <p className="font-display text-4xl text-gradient-gold mt-2">
                  {p.price}
                  <span className="text-sm text-muted-foreground ml-1">/mo</span>
                </p>

                <div className="hairline my-6" />

                <ul className="space-y-3 mb-7">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-cream/85">
                      <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={p.current ? "luxury" : "gold"}
                  size="lg"
                  className="w-full"
                  disabled={p.current}
                >
                  {p.current ? "Current Plan" : "Upgrade"}
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ProfileField({
  icon: Icon,
  label,
  defaultValue,
}: {
  icon: any;
  label: string;
  defaultValue: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </Label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          defaultValue={defaultValue}
          className="h-11 pl-10 bg-input border-border/60 focus-visible:border-gold/50 focus-visible:ring-gold/40"
        />
      </div>
    </div>
  );
}
