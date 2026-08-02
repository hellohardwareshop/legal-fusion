## Goal

Import the Legal Manager module from `BOSSsoftwarevala/sapphire-nexus-command` into this project **exactly as it is** — same screens, same layout, same sidebar, same visuals — running on real data via Lovable Cloud. No auth gate, no extra modules, no mock/fake data.

## What gets imported (verified file list from the repo)

**Legal Manager enterprise shell — `src/components/legal-manager/`**
- LMEnterpriseLayout, LMSidebar
- LMDocumentVault, LMLegalAlerts, LMLegalLogs, LMPolicyCompliance, LMTrademarkMonitor, LMViolations
- 15 screens: LMDashboard, LMAgreementEngine, LMUserRoleAgreements, LMProductLegalBinding, LMLoginGateControl, LMInternationalLaw, LMCopyrightManagement, LMTrademarkManagement, LMBrandIPProtection, LMPolicyManagement, LMAILegalIntelligence, LMApprovalControl, LMAuditLogs, LMNotifications, LMSettings

**Legal Manager dashboard — `src/pages/legal-manager/`**
- LegalManagerDashboard + 10 screens: LegalOverview, LegalPoliciesTerms, LegalContracts, LegalTrademarksIP, LegalComplianceChecklist, LegalRequests, LegalIncidentsDisputes, LegalApprovals, LegalReports, LegalAudit

**Supporting**
- `useLegalAI` hook (AI legal assistant)
- The exact design tokens the module renders against (colors, gradients, glass/enterprise styles) copied from the source `index.css`/`tailwind.config.ts` into `src/styles.css`, so the imported UI looks identical
- Every shadcn UI primitive the module uses (button, badge, avatar, scroll-area, card, table, tabs, dialog, input, select, progress, etc.)
- `framer-motion`, `lucide-react`, `sonner`, `recharts` installed as needed

Nothing else from the repo is imported — no other modules, no author login, no role gate.

## Backend (Lovable Cloud)

Enable Cloud and create real tables backing every screen, each with grants + RLS, plus a migration containing realistic seed rows (real-looking legal records, not lorem/mock arrays hardcoded in components):

- legal_documents, legal_contracts, legal_agreements
- legal_policies, policy_acceptances
- trademarks, copyrights, ip_assets, brand_violations
- compliance_items, compliance_jurisdictions
- legal_requests, legal_incidents, legal_disputes
- legal_approvals, legal_audit_logs, legal_notifications, legal_alerts
- legal_reports, legal_settings

Storage bucket for the Document Vault (upload/download/preview real files).

All reads/writes go through TanStack `createServerFn` + TanStack Query — every list, counter, chart, filter, create/edit/delete, and status change in the imported screens is wired to these tables. No hardcoded arrays left behind.

AI Legal Intelligence / AI assistant is rebuilt as a server function on the Lovable AI gateway (replaces the repo's `ai-legal-assistant` edge function), streaming real responses.

## Routing

The repo uses React Router; this stack uses TanStack Router file routes. Same URLs, same in-app navigation behavior:

```text
/                          -> Legal Manager (LMEnterpriseLayout)
/legal-manager             -> LegalManagerDashboard
/legal-manager/$screen     -> its 10 screens
```

Sidebar state-based screen switching from the original is preserved exactly. Each route gets its own head() metadata.

## Technical notes

- `react-router-dom` imports (`useNavigate`, `Link`) rewritten to `@tanstack/react-router`; `useAuth`/role guards removed per the no-auth decision.
- Component JSX, class names, animations, icons and copy are kept byte-for-byte wherever possible so the result matches the source exactly.
- Public read policies for anon so screens render without login, with server functions using the publishable-key client.
- Work is split across parallel sub-agents (shell+sidebar, LM 15 screens, dashboard 10 screens, database+server functions) and then verified end-to-end in the browser, screen by screen, before I report done.
