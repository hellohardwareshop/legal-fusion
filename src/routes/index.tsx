import { createFileRoute } from "@tanstack/react-router";

import LMEnterpriseLayout from "@/components/legal-manager/LMEnterpriseLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Legal Manager — Software Vala" },
      {
        name: "description",
        content:
          "Enterprise legal command center: agreements, policies, trademarks, copyrights, compliance and audit logs.",
      },
      { property: "og:title", content: "Legal Manager — Software Vala" },
      {
        property: "og:description",
        content:
          "Enterprise legal command center: agreements, policies, trademarks, copyrights, compliance and audit logs.",
      },
    ],
  }),
  component: LegalManagerModule,
});

function LegalManagerModule() {
  return <LMEnterpriseLayout />;
}
