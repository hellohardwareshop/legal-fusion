import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Shield, Database, UserCheck } from "lucide-react";
import { toast } from "sonner";

import {
  useLegalRecords,
  useLogAction,
  useUpdateRecordStatus,
  type LegalRecord,
} from "@/lib/legal-data";

const LegalComplianceChecklist = () => {
  const { data: gdprItems = [] } = useLegalRecords("compliance_gdpr");
  const { data: kycItems = [] } = useLegalRecords("compliance_kyc");
  const { data: dataProtection = [] } = useLegalRecords("compliance_dp");
  const updateRecord = useUpdateRecordStatus();
  const logAction = useLogAction();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant": return <CheckCircle className="h-5 w-5 text-emerald-400" />;
      case "review_needed": return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case "concern": return <AlertTriangle className="h-5 w-5 text-red-400" />;
      default: return <CheckCircle className="h-5 w-5 text-slate-400" />;
    }
  };

  const handleMarkReviewed = (item: LegalRecord, category: string) => {
    updateRecord.mutate(
      {
        id: item.id,
        category,
        status: "compliant",
        action: "Compliance Reviewed",
        details: `${item.ref_code ?? item.name} marked as reviewed`,
      },
      { onSuccess: () => toast.success(`Item ${item.ref_code ?? item.name} marked as reviewed`) },
    );
  };

  const handleRaiseConcern = (item: LegalRecord, category: string) => {
    updateRecord.mutate(
      {
        id: item.id,
        category,
        status: "concern",
        action: "Compliance Concern Raised",
        details: `Concern raised for ${item.ref_code ?? item.name}`,
      },
      { onSuccess: () => toast.warning(`Concern raised for item ${item.ref_code ?? item.name}`) },
    );
    logAction.reset();
  };

  const renderChecklist = (
    items: LegalRecord[],
    category: string,
    icon: React.ReactNode,
    title: string,
  ) => (
    <Card className="bg-slate-900/50 border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-amber-400 flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-lg p-3">
            <div className="flex items-center gap-3">
              {getStatusIcon(item.status)}
              <div>
                <p className="text-white text-sm">{item.name}</p>
                <p className="text-slate-500 text-xs">Last review: {item.lastReview}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={
                item.status === "compliant" ? "bg-emerald-500/20 text-emerald-400" :
                item.status === "review_needed" ? "bg-yellow-500/20 text-yellow-400" :
                "bg-red-500/20 text-red-400"
              }>
                {item.status.replace("_", " ")}
              </Badge>
              <Button size="sm" variant="ghost" onClick={() => handleMarkReviewed(item, category)}>
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => handleRaiseConcern(item, category)}>
                <AlertTriangle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-white">Compliance Checklist</h2>

      {renderChecklist(gdprItems, "compliance_gdpr", <Shield className="h-5 w-5" />, "GDPR / Local Law Status")}
      {renderChecklist(kycItems, "compliance_kyc", <UserCheck className="h-5 w-5" />, "KYC / AML Checks")}
      {renderChecklist(dataProtection, "compliance_dp", <Database className="h-5 w-5" />, "Data Protection Rules")}
    </motion.div>
  );
};

export default LegalComplianceChecklist;
