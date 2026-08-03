import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit } from "lucide-react";
import { toast } from "sonner";

import { useLegalRecords, useUpdateRecordStatus, useLogAction } from "@/lib/legal-data";

const LegalPoliciesTerms = () => {
  const { data: policies = [] } = useLegalRecords("policy");
  const updateRecord = useUpdateRecordStatus();
  const logAction = useLogAction();

  const handleProposeUpdate = (id: string, name: string) => {
    updateRecord.mutate(
      {
        id,
        category: "policy",
        status: "review",
        action: "Policy Update Proposed",
        details: `Update proposal submitted for "${name}"`,
      },
      { onSuccess: () => toast.success(`Update proposal for "${name}" submitted for boss approval`) },
    );
  };

  const handleView = (name: string, version: string) => {
    logAction.mutate(
      {
        action: "Policy Viewed",
        category: "policy",
        actor: "LM-A1B2",
        details: `Viewed ${name} ${version}`,
      },
      { onSuccess: () => toast.success(`Viewing: ${name} ${version}`) },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-xl font-semibold text-white">Policies & Terms</h2>

      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-amber-400">All Legal Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-400">Document Name</TableHead>
                <TableHead className="text-slate-400">Version</TableHead>
                <TableHead className="text-slate-400">Region</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400">Last Updated</TableHead>
                <TableHead className="text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id} className="border-slate-700/50">
                  <TableCell className="text-white font-medium">{policy.name}</TableCell>
                  <TableCell className="text-slate-300">{policy.version}</TableCell>
                  <TableCell className="text-slate-300">{policy.region}</TableCell>
                  <TableCell>
                    <Badge className={
                      policy.status === "active" ? "bg-emerald-500/20 text-emerald-400" :
                      policy.status === "review" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-slate-500/20 text-slate-400"
                    }>
                      {policy.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300">{policy.updated}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleView(policy.name, policy.version)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleProposeUpdate(policy.id, policy.name)}>
                        <Edit className="h-4 w-4 text-amber-400" />
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

export default LegalPoliciesTerms;
