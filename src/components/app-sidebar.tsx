import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, PlusSquare, Sparkles, Settings, LogOut } from "lucide-react";
import { QubeLogo } from "./qube-logo";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "New Publication", to: "/new", icon: PlusSquare },
  { label: "AI Preview", to: "/preview", icon: Sparkles },
  { label: "Settings", to: "/settings", icon: Settings },
];

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden md:flex w-72 shrink-0 flex-col border-r border-border/60 bg-sidebar relative noise-overlay">
      <div className="px-7 pt-8 pb-10">
        <Link to="/dashboard">
          <QubeLogo size="md" />
        </Link>
        <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70">
          Social Automation Suite
        </p>
      </div>

      <div className="px-4 mb-2">
        <div className="hairline" />
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        <p className="px-3 mb-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
          Workspace
        </p>
        {nav.map((item) => {
          const active = path === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all relative",
                active
                  ? "bg-gold/10 text-cream"
                  : "text-muted-foreground hover:text-cream hover:bg-accent/40",
              )}
            >
              {active && (
                <span className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-gold rounded-full" />
              )}
              <item.icon className={cn("h-4 w-4", active ? "text-gold" : "")} />
              <span className="font-medium tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/60">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-card/60">
          <div className="h-9 w-9 rounded-full bg-gradient-gold flex items-center justify-center text-obsidian font-semibold text-sm">
            BV
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-cream truncate">Bella Vita Trattoria</p>
            <p className="text-[11px] text-gold/80 tracking-wider uppercase">Pro Plan</p>
          </div>
          <Link to="/" className="text-muted-foreground hover:text-gold transition">
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
