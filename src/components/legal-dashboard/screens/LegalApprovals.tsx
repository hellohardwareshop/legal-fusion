import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

import { useLegalRecords, useUpdateRecordStatus } from "@/lib/legal-data";

const LegalApprovals = () => {
  const { data: approvals = [] } = useLegalRecords("approval");
  const updateRecord = useUpdateRecordStatus();

  const handleApprove = (id: string, ref: string) => {
    updateRecord.mutate(
      {
        id,
        category: "approval",
        status: "approved",
        action: "Approval Given",
        details: `Approval ${ref} approved`,
      },
      { onSuccess: () => toast.success(`Approval ${ref} approved`) },
    );
  };

  const handleReject = (id: string, ref: string) => {
    updateRecord.mutate(
      {
        id,
        category: "approval",
        status: "rejected",
        action: "Approval Rejected",
        details: `Approval ${ref} rejected`,
      },
      { onSuccess: () => toast.error(`Approval ${ref} rejected`) },
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/20 text-yellow-400";
      case "approved": return "bg-emerald-500/20 text-emerald-400";
      case "rejected": return "bg-red-500/20 text-red-400";
      default: return "bg-slate-500/20 text-slate-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Approvals</h2>
        <Badge className="bg-yellow-500/20 text-yellow-400">
          {approvals.filter((a) => a.status === "pending").length} Pending
        </Badge>
      </div>

      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-amber-400">Approval Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-400">Item</TableHead>
                <TableHead className="text-slate-400">Requested By</TableHead>
                <TableHead className="text-slate-400">Impact</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvals.map((approval) => (
                <TableRow key={approval.id} className="border-slate-700/50">
                  <TableCell className="text-white font-medium">{approval.name}</TableCell>
                  <TableCell className="text-slate-300 font-mono text-sm">{approval.requestedBy}</TableCell>
                  <TableCell className="text-slate-300">{approval.impact}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(approval.status)}>{approval.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {approval.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => handleApprove(approval.id, approval.ref_code ?? approval.name)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(approval.id, approval.ref_code ?? approval.name)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
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

export default LegalApprovals;
