import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "QubeSight — Luxury Real Estate Automation" },
      {
        name: "description",
        content:
          "QubeSight orchestrates intelligent publication of luxury real estate listings across every social channel — composed, scheduled, and elevated by AI.",
      },
      { name: "author", content: "QubeSight" },
      { property: "og:title", content: "QubeSight — Luxury Real Estate Automation" },
      {
        property: "og:description",
        content: "The private automation suite for elite real estate ateliers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "QubeSight — Luxury Real Estate Automation" },
      { name: "description", content: "PropIA is an AI-powered social media automation SaaS for businesses." },
      { property: "og:description", content: "PropIA is an AI-powered social media automation SaaS for businesses." },
      { name: "twitter:description", content: "PropIA is an AI-powered social media automation SaaS for businesses." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0ffdaa31-3e1a-4356-93a5-0f3aeb8b0bfe/id-preview-e52fdbe7--4fd218c2-068a-4540-a8b6-4f6364903454.lovable.app-1777681943801.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0ffdaa31-3e1a-4356-93a5-0f3aeb8b0bfe/id-preview-e52fdbe7--4fd218c2-068a-4540-a8b6-4f6364903454.lovable.app-1777681943801.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
