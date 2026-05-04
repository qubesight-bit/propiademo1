import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    try {
      sessionStorage.setItem("qs_auth", "1");
    } catch {}
    throw redirect({ to: "/dashboard" });
  },
});
