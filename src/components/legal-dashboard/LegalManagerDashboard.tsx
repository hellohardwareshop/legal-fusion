import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { 
  LayoutDashboard, 
  FileText, 
  FileSignature, 
  Shield, 
  CheckSquare, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle, 
  BarChart3,
  BookOpen,
  LogOut,
  Activity,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLegalAlerts, useLegalViolations } from "@/lib/legal-data";
import { PageShell, ModuleHero } from "@/components/layout/PageShell";

// Import screens
import LegalOverview from "./screens/LegalOverview";
import LegalPoliciesTerms from "./screens/LegalPoliciesTerms";
import LegalContracts from "./screens/LegalContracts";
import LegalTrademarksIP from "./screens/LegalTrademarksIP";
import LegalComplianceChecklist from "./screens/LegalComplianceChecklist";
import LegalRequests from "./screens/LegalRequests";
import LegalIncidentsDisputes from "./screens/LegalIncidentsDisputes";
import LegalApprovals from "./screens/LegalApprovals";
import LegalReports from "./screens/LegalReports";
import LegalAudit from "./screens/LegalAudit";

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "policies", label: "Policies & Terms", icon: FileText },
  { id: "contracts", label: "Contracts", icon: FileSignature },
  { id: "trademarks", label: "Trademarks & IP", icon: Shield },
  { id: "compliance", label: "Compliance Checklist", icon: CheckSquare },
  { id: "requests", label: "Legal Requests", icon: MessageSquare },
  { id: "incidents", label: "Incidents & Disputes", icon: AlertTriangle },
  { id: "approvals", label: "Approvals", icon: CheckCircle },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "audit", label: "Audit", icon: BookOpen },
];

const LegalManagerDashboard = () => {
  const [activeScreen, setActiveScreen] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: alerts = [] } = useLegalAlerts();
  const { data: violations = [] } = useLegalViolations();
  const complianceStatus: "Clear" | "Warning" | "Critical" =
    alerts.some((alert) => alert.status !== "reviewed" && alert.severity === "critical") ||
    violations.some((violation) => violation.status !== "resolved" && violation.severity === "critical")
      ? "Critical"
      : alerts.some((alert) => alert.status !== "reviewed") || violations.some((violation) => violation.status !== "resolved")
        ? "Warning"
        : "Clear";
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent copy/paste
    const preventCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      toast.error("Copy/Paste is disabled for security");
    };
    
    // Prevent screenshot (basic)
    const preventScreenshot = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen" || (e.metaKey && e.shiftKey && e.key === "4")) {
        e.preventDefault();
        toast.error("Screenshots are disabled for security");
      }
    };

    document.addEventListener("copy", preventCopy);
    document.addEventListener("paste", preventCopy);
    document.addEventListener("keydown", preventScreenshot);

    return () => {
      document.removeEventListener("copy", preventCopy);
      document.removeEventListener("paste", preventCopy);
      document.removeEventListener("keydown", preventScreenshot);
    };
  }, []);

  const handleLogout = async () => {
    navigate({ to: "/" });
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case "overview": return <LegalOverview />;
      case "policies": return <LegalPoliciesTerms />;
      case "contracts": return <LegalContracts />;
      case "trademarks": return <LegalTrademarksIP />;
      case "compliance": return <LegalComplianceChecklist />;
      case "requests": return <LegalRequests />;
      case "incidents": return <LegalIncidentsDisputes />;
      case "approvals": return <LegalApprovals />;
      case "reports": return <LegalReports />;
      case "audit": return <LegalAudit />;
      default: return <LegalOverview />;
    }
  };

  const getStatusColor = () => {
    switch (complianceStatus) {
      case "Clear": return "text-emerald-400 bg-emerald-500/20";
      case "Warning": return "text-yellow-400 bg-yellow-500/20";
      case "Critical": return "text-red-400 bg-red-500/20";
    }
  };

  const activeItem = sidebarItems.find((item) => item.id === activeScreen) ?? sidebarItems[0];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background flex select-none">
      {sidebarOpen && <div className="fixed inset-0 z-20 bg-background/80 md:hidden" onClick={() => setSidebarOpen(false)} />}
      {/* Fixed Left Sidebar */}
      <aside className={`fixed z-30 flex h-full w-[264px] flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl transition-transform md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="border-b border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">LM</div>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold text-foreground">Legal Manager</h1>
              <p className="truncate text-xs text-muted-foreground">Compliance Center</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveScreen(item.id); setSidebarOpen(false); }}
              className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                activeScreen === item.id
                   ? "bg-primary/15 font-medium text-foreground"
                   : "text-sidebar-foreground/75 hover:bg-sidebar-accent/55 hover:text-sidebar-accent-foreground"
              }`}
            >
              {activeScreen === item.id && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-primary" />
              )}
              <item.icon className={`h-5 w-5 ${activeScreen === item.id ? "text-primary" : ""}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full justify-start rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Secure Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="ml-0 flex min-w-0 flex-1 flex-col md:ml-[264px]">
        {/* Mobile-only header; desktop navigation lives entirely in the sidebar. */}
        <header className="fixed left-0 right-0 top-0 z-10 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-xl md:hidden">
          <div className="flex min-w-0 items-center gap-3">
            <Button size="icon" variant="ghost" className="md:hidden" onClick={() => setSidebarOpen((open) => !open)} aria-label="Toggle navigation">
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          <h2 className="truncate text-base md:text-lg font-semibold text-foreground">
            Legal Manager — Compliance Center
          </h2>
          </div>
           <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${getStatusColor()}`}>
              <Activity className="h-4 w-4" />
              <span className="hidden text-sm font-medium sm:inline">Compliance Status: {complianceStatus}</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
         <main className="mt-14 min-w-0 flex-1 overflow-auto md:mt-0">
          <PageShell>
            <ModuleHero
              eyebrow="Compliance Center"
              title={activeItem?.label ?? "Overview"}
              description="Contracts, policies, requests, incidents and the immutable audit trail — all on live data."
              icon={activeItem?.icon}
              meta={[
                { label: "Compliance", value: complianceStatus },
                { label: "Open alerts", value: String(alerts.filter((a) => a.status !== "reviewed").length) },
                { label: "Open violations", value: String(violations.filter((v) => v.status !== "resolved").length) },
                { label: "Sections", value: String(sidebarItems.length) },
              ]}
            />
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderScreen()}
            </motion.div>
          </PageShell>
        </main>
      </div>
    </div>
  );
};


export default LegalManagerDashboard;
