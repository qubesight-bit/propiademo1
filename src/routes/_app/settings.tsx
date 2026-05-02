import { createFileRoute } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Music2,
  Store,
  Check,
  Crown,
  Mail,
  User,
  Building,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — QubeSight" },
      { name: "description", content: "Manage connected accounts, subscription, and atelier profile." },
    ],
  }),
  component: SettingsPage,
});

const accounts = [
  {
    icon: Instagram,
    label: "Instagram",
    handle: "@maison.marchetti",
    connected: true,
    since: "Connected since Mar 2024",
  },
  {
    icon: Facebook,
    label: "Facebook",
    handle: "Maison Marchetti — Paris",
    connected: true,
    since: "Connected since Mar 2024",
  },
  {
    icon: Music2,
    label: "TikTok",
    handle: "@marchetti.luxury",
    connected: true,
    since: "Connected since Aug 2024",
  },
  {
    icon: Store,
    label: "Marketplace",
    handle: "Not connected",
    connected: false,
    since: "Syndicate to leading portals",
  },
];

const plans = [
  {
    id: "essence",
    name: "Essence",
    price: "€290",
    note: "Solo brokers",
    features: ["Up to 25 listings/mo", "3 connected channels", "Standard AI compositions"],
  },
  {
    id: "atelier",
    name: "Atelier",
    price: "€690",
    note: "Most chosen",
    features: [
      "Unlimited listings",
      "All channels & cinematic reels",
      "Concierge AI tone tuning",
      "Priority publication windows",
    ],
    current: true,
  },
  {
    id: "private",
    name: "Privé",
    price: "Bespoke",
    note: "Multi-office maisons",
    features: [
      "Dedicated relationship manager",
      "Custom voice training",
      "API & CRM integration",
      "White-glove onboarding",
    ],
  },
];

function SettingsPage() {
  return (
    <div className="px-10 py-12 max-w-[1400px] mx-auto">
      <header className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.35em] text-gold mb-3">Atelier</p>
        <h1 className="font-display text-5xl text-cream">
          Settings & <span className="italic text-gradient-gold">Preferences</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Curate your QubeSight experience — channels, subscription, and the voice of your atelier.
        </p>
      </header>

      <div className="space-y-10">
        {/* Profile */}
        <section className="bg-gradient-card border border-border/60 rounded-xl p-7 shadow-soft">
          <div className="flex items-start justify-between mb-7">
            <div>
              <h2 className="font-display text-2xl text-cream">Profile</h2>
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
                AM
              </div>
              <button className="text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-soft transition">
                Change portrait
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ProfileField icon={User} label="Full Name" defaultValue="Alexandre Marchetti" />
              <ProfileField icon={Mail} label="Email" defaultValue="alexandre@maison-marchetti.fr" />
              <ProfileField icon={Building} label="Atelier" defaultValue="Maison Marchetti — Paris" />
              <ProfileField icon={Sparkles} label="Brand Voice" defaultValue="Discreet · refined · timeless" />
            </div>
          </div>
        </section>

        {/* Connected accounts */}
        <section className="bg-gradient-card border border-border/60 rounded-xl p-7 shadow-soft">
          <div className="mb-7">
            <h2 className="font-display text-2xl text-cream">Connected Channels</h2>
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
                  {a.connected ? "Manage" : "Connect"}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Subscription */}
        <section>
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl text-cream">Subscription</h2>
              <p className="text-xs text-muted-foreground mt-1">
                Your atelier is currently on the <span className="text-gold">Atelier</span> plan.
              </p>
            </div>
            <p className="text-xs text-muted-foreground tracking-wider">
              Next renewal · 14 December 2025
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                  {p.price.startsWith("€") && (
                    <span className="text-sm text-muted-foreground ml-1">/mo</span>
                  )}
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
                  {p.current ? "Current Plan" : p.id === "private" ? "Contact Us" : "Upgrade"}
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
