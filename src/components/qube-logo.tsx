import { cn } from "@/lib/utils";

interface QubeLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

export function QubeLogo({ className, showWordmark = true, size = "md" }: QubeLogoProps) {
  const dim = size === "sm" ? 22 : size === "lg" ? 40 : 28;
  const text = size === "sm" ? "text-base" : size === "lg" ? "text-3xl" : "text-xl";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="qubeGold" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="oklch(0.86 0.08 88)" />
            <stop offset="55%" stopColor="oklch(0.78 0.12 85)" />
            <stop offset="100%" stopColor="oklch(0.62 0.13 75)" />
          </linearGradient>
        </defs>
        <path
          d="M20 3 L35 11.5 L35 28.5 L20 37 L5 28.5 L5 11.5 Z"
          stroke="url(#qubeGold)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M20 11 L28 15.5 L28 24.5 L20 29 L12 24.5 L12 15.5 Z"
          fill="url(#qubeGold)"
          opacity="0.18"
        />
        <path
          d="M20 11 L28 15.5 L28 24.5 L20 29 L12 24.5 L12 15.5 Z"
          stroke="url(#qubeGold)"
          strokeWidth="1.25"
          fill="none"
        />
        <circle cx="20" cy="20" r="2" fill="url(#qubeGold)" />
      </svg>
      {showWordmark && (
        <span className={cn("font-display font-semibold tracking-tight text-cream", text)}>
          Qube<span className="text-gradient-gold">Sight</span>
        </span>
      )}
    </div>
  );
}
