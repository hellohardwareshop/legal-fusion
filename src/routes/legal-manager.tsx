import { createFileRoute } from "@tanstack/react-router";

import LegalManagerDashboard from "@/components/legal-dashboard/LegalManagerDashboard";

export const Route = createFileRoute("/legal-manager")({
  head: () => ({
    meta: [
      { title: "Legal Manager Dashboard — Software Vala" },
      {
        name: "description",
        content:
          "Legal Manager dashboard: contracts, policies, requests, incidents, approvals, reports and the immutable audit trail.",
      },
      { property: "og:title", content: "Legal Manager Dashboard — Software Vala" },
      {
        property: "og:description",
        content:
          "Legal Manager dashboard: contracts, policies, requests, incidents, approvals, reports and the immutable audit trail.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LegalManagerDashboard,
});
