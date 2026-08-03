import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

import { useLegalRecords, useLogAction, useUpdateRecordStatus } from "@/lib/legal-data";

const LegalIncidentsDisputes = () => {
  const { data: incidents = [] } = useLegalRecords("incident");
  const logAction = useLogAction();
  const updateRecord = useUpdateRecordStatus();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500/20 text-red-400";
      case "high": return "bg-orange-500/20 text-orange-400";
      case "medium": return "bg-yellow-500/20 text-yellow-400";
      case "low": return "bg-blue-500/20 text-blue-400";
      default: return "bg-slate-500/20 text-slate-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "investigating": return "bg-blue-500/20 text-blue-400";
      case "pending_action": return "bg-yellow-500/20 text-yellow-400";
      case "resolved": return "bg-emerald-500/20 text-emerald-400";
      case "escalated": return "bg-purple-500/20 text-purple-400";
      default: return "bg-slate-500/20 text-slate-400";
    }
  };

  const handleInvestigate = (id: string, ref: string) => {
    updateRecord.mutate(
      {
        id,
        category: "incident",
        status: "investigating",
        action: "Incident Investigation Started",
        details: `Investigation started for case ${ref}`,
      },
      { onSuccess: () => toast.info(`Investigation started for case ${ref}`) },
    );
  };

  const handleRecommendAction = (ref: string) => {
    logAction.mutate(
      {
        action: "Incident Action Recommended",
        category: "incident",
        actor: "LM-A1B2",
        details: `Action recommendation submitted for case ${ref}`,
      },
      { onSuccess: () => toast.success(`Action recommendation submitted for case ${ref}`) },
    );
  };

  const handleEscalate = (id: string, ref: string) => {
    updateRecord.mutate(
      {
        id,
        category: "incident",
        status: "escalated",
        action: "Incident Escalated",
        details: `Case ${ref} escalated to Super Admin`,
      },
      { onSuccess: () => toast.warning(`Case ${ref} escalated to Super Admin`) },
    );
  };

  const criticalCount = incidents.filter((i) => i.severity === "critical").length;
  const investigatingCount = incidents.filter((i) => i.status === "investigating").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Incidents & Disputes</h2>
        <div className="flex gap-2">
          <Badge className="bg-red-500/20 text-red-400">{criticalCount} Critical</Badge>
          <Badge className="bg-blue-500/20 text-blue-400">{investigatingCount} Investigating</Badge>
        </div>
      </div>

      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-amber-400">All Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-400">Case ID</TableHead>
                <TableHead className="text-slate-400">Type</TableHead>
                <TableHead className="text-slate-400">Parties</TableHead>
                <TableHead className="text-slate-400">Severity</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident.id} className="border-slate-700/50">
                  <TableCell className="text-amber-400 font-mono">{incident.ref_code}</TableCell>
                  <TableCell className="text-white">{incident.type || incident.name}</TableCell>
                  <TableCell className="text-slate-300">{incident.parties}</TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(incident.severity)}>{incident.severity}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(incident.status)}>
                      {incident.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleInvestigate(incident.id, incident.ref_code ?? incident.name)}
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRecommendAction(incident.ref_code ?? incident.name)}
                      >
                        <FileText className="h-4 w-4 text-emerald-400" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEscalate(incident.id, incident.ref_code ?? incident.name)}
                      >
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LegalIncidentsDisputes;
