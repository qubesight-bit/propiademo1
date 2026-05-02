import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { QubeLogo } from "@/components/qube-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, Lock, AlertCircle } from "lucide-react";

const VALID_EMAIL = "erlibbylugo@qubesight.lat";
const VALID_PASSWORD = "@Qub3s1ght2001crc";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QubeSight — Private Client Login" },
      {
        name: "description",
        content:
          "QubeSight — the private automation suite for elite real estate professionals. Sign in to your atelier.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background relative overflow-hidden">
      {/* Left — visual */}
      <div className="relative hidden lg:flex flex-col justify-between p-14 bg-gradient-obsidian noise-overlay overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-gold/5 blur-3xl" />

        <div className="relative z-10">
          <QubeLogo size="lg" />
        </div>

        <div className="relative z-10 max-w-lg space-y-8">
          <div className="hairline w-24" />
          <h1 className="font-display text-5xl xl:text-6xl leading-[1.05] text-cream">
            The silent engine behind <span className="italic text-gradient-gold">extraordinary</span>{" "}
            listings.
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed font-light">
            QubeSight orchestrates intelligent publication of luxury properties across every social
            channel — composed, scheduled, and elevated by AI.
          </p>
          <div className="flex items-center gap-6 pt-4">
            <div>
              <p className="font-display text-3xl text-gradient-gold">2.4B€</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                Listings published
              </p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="font-display text-3xl text-gradient-gold">418</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                Maisons clientes
              </p>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs uppercase tracking-[0.3em] text-muted-foreground/70">
          Paris · Monaco · New York · Dubai
        </p>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center p-8 sm:p-14 relative">
        <div className="w-full max-w-md space-y-10">
          <div className="lg:hidden">
            <QubeLogo size="md" />
          </div>

          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold">
              {mode === "login" ? "Welcome back" : "Request access"}
            </p>
            <h2 className="font-display text-4xl text-cream">
              {mode === "login" ? "Enter your atelier" : "Create your atelier"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {mode === "login"
                ? "Continue curating the world's most refined listings."
                : "Join an invitation-only network of luxury real estate ateliers."}
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setError(null);
              if (mode === "login") {
                if (
                  email.trim().toLowerCase() === VALID_EMAIL &&
                  password === VALID_PASSWORD
                ) {
                  try {
                    sessionStorage.setItem("qs_auth", "1");
                  } catch {}
                  navigate({ to: "/dashboard" });
                } else {
                  setError("Invalid credentials. Please verify your email and password.");
                }
              } else {
                navigate({ to: "/dashboard" });
              }
            }}
            className="space-y-5"
          >
            {mode === "register" && (
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Full Name
                </Label>
                <Input
                  placeholder="Alexandre Marchetti"
                  className="h-12 bg-input border-border/60 focus-visible:ring-gold/40 focus-visible:border-gold/50"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alexandre@maison.com"
                  autoComplete="email"
                  className="h-12 pl-11 bg-input border-border/60 focus-visible:ring-gold/40 focus-visible:border-gold/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  className="h-12 pl-11 bg-input border-border/60 focus-visible:ring-gold/40 focus-visible:border-gold/50"
                />
              </div>
            </div>

            {mode === "login" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-muted-foreground hover:text-gold transition tracking-wide"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2.5 text-xs text-destructive">
                <AlertCircle className="h-4 w-4 mt-px shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" variant="gold" size="lg" className="w-full mt-2 group">
              {mode === "login" ? "Sign In" : "Create Account"}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </form>

          <div className="relative">
            <div className="hairline" />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {mode === "login" ? "New to QubeSight?" : "Already have an atelier?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-gold hover:text-gold-soft transition font-medium"
            >
              {mode === "login" ? "Request invitation" : "Sign in"}
            </button>
          </p>

          <p className="text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
            Protected by enterprise-grade encryption
          </p>
        </div>
      </div>
    </div>
  );
}
