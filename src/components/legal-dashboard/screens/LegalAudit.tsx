import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, AlertTriangle } from "lucide-react";

import { useLegalLogs } from "@/lib/legal-data";

const RESULT_BY_ACTION: Record<string, string> = {
  "Policy Updated": "Approved",
  "Policy Status Changed": "Approved",
  "Policy Update Proposed": "Pending Approval",
  "Contract Reviewed": "Flagged Risk",
  "Contract Risk Flagged": "Flagged Risk",
  "Trademark Record Requested": "Pending Approval",
  "Trademark Renewal Requested": "Pending Approval",
  "Incident Escalated": "Escalated",
  "Alert Escalated": "Escalated",
  "Violation Escalated": "Escalated",
  "Compliance Reviewed": "Compliant",
  "Legal Request Resolved": "Resolved",
  "Approval Given": "Approved",
  "Approval Rejected": "Rejected",
};

const LegalAudit = () => {
  const { data: logs = [] } = useLegalLogs();

  const getResultColor = (result: string) => {
    switch (result) {
      case "Approved": case "Compliant": case "Resolved": return "text-emerald-400";
      case "Pending Approval": return "text-yellow-400";
      case "Rejected": case "Flagged Risk": return "text-red-400";
      case "Escalated": return "text-purple-400";
      default: return "text-slate-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-amber-400" />
          <h2 className="text-xl font-semibold text-white">Audit Trail</h2>
        </div>
        <Badge className="bg-slate-700 text-slate-300">Read Only</Badge>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-center gap-3">
        <AlertTriangle className="h-5 w-5 text-yellow-400" />
        <p className="text-yellow-400 text-sm">
          This is an immutable audit log. No modifications or exports are permitted.
        </p>
      </div>

      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-amber-400">Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-400">Time</TableHead>
                <TableHead className="text-slate-400">Action</TableHead>
                <TableHead className="text-slate-400">Actor</TableHead>
                <TableHead className="text-slate-400">Result</TableHead>
                <TableHead className="text-slate-400">Approval Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => {
                const result = RESULT_BY_ACTION[log.action] ?? "Logged";
                const approvalRef =
                  result === "Approved" || result === "Pending Approval" || result === "Escalated"
                    ? log.ref_code
                    : "N/A";
                return (
                  <TableRow key={log.id} className="border-slate-700/50">
                    <TableCell className="text-slate-300 font-mono text-sm">
                      {new Date(log.logged_at).toLocaleString("sv-SE").replace("T", " ")}
                    </TableCell>
                    <TableCell className="text-white">{log.action}</TableCell>
                    <TableCell className="text-slate-300 font-mono text-sm">{log.actor}</TableCell>
                    <TableCell className={getResultColor(result)}>{result}</TableCell>
                    <TableCell className={approvalRef === "N/A" ? "text-slate-500" : "text-amber-400 font-mono text-sm"}>
                      {approvalRef}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LegalAudit;
