import { Settings, CheckCircle, AlertTriangle } from "lucide-react";

import { CatalogueScreen, statusBadge } from "../common/CatalogueScreen";
import { subsectionLabel } from "../common/subsection";

interface LMSettingsProps {
  activeSubSection: string;
}

const LMSettings = ({ activeSubSection }: LMSettingsProps) => (
  <CatalogueScreen
    title="Settings"
    description="Legal configuration, notification rules and security posture"
    icon={Settings}
    category="setting"
    tableTitle="Configuration"
    focusLabel={subsectionLabel(activeSubSection)}
    columns={[
      { key: "name", header: "Setting" },
      { key: "type", header: "Area" },
      { key: "description", header: "Purpose" },
      { key: "status", header: "Status", render: (r) => statusBadge(String(r.status)) },
    ]}
    actions={[
      { label: "Mark configured", status: "configured", action: "Setting Configured", icon: CheckCircle, confirm: false },
      { label: "Needs review", status: "review", action: "Setting Flagged For Review", icon: AlertTriangle, confirm: true },
    ]}
  />
);

export default LMSettings;
