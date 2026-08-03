import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, RefreshCw, Globe, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

import { useLegalRecords, useLogAction } from "@/lib/legal-data";

const LegalTrademarksIP = () => {
  const { data: trademarks = [] } = useLegalRecords("trademark");
  const { data: pendingApplications = [] } = useLegalRecords("trademark_application");
  const logAction = useLogAction();

  const handleAddRecord = () => {
    logAction.mutate(
      {
        action: "Trademark Record Requested",
        category: "trademark",
        actor: "LM-A1B2",
        details: "New trademark record submitted for approval",
      },
      { onSuccess: () => toast.info("Trademark record addition submitted for approval") },
    );
  };

  const handleRenewRequest = (ref: string) => {
    logAction.mutate(
      {
        action: "Trademark Renewal Requested",
        category: "trademark",
        actor: "LM-A1B2",
        details: `Renewal request submitted for ${ref}`,
      },
      { onSuccess: () => toast.info(`Renewal request for ${ref} submitted for approval`) },
    );
  };

  // Expiry alerts derived from real records (expiring within 12 months).
  const now = Date.now();
  const expiringSoon = trademarks.filter((tm) => {
    if (!tm.expiry || tm.expiry === "N/A") return false;
    const ts = new Date(tm.expiry).getTime();
    return !Number.isNaN(ts) && ts - now < 1000 * 60 * 60 * 24 * 365;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Trademarks & IP</h2>
        <Button onClick={handleAddRecord} className="bg-amber-600 hover:bg-amber-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Record
        </Button>
      </div>

      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-amber-400">Registered Trademarks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trademarks.map((tm) => (
              <div key={tm.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{tm.name}</h3>
                    <p className="text-slate-400 text-sm">{tm.type}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Globe className="h-4 w-4 text-slate-500" />
                      <span className="text-slate-300 text-sm">
                        {(tm.regions as string[] | undefined)?.join(", ")}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={tm.status === "registered" ? "bg-emerald-500/20 text-emerald-400" : "bg-yellow-500/20 text-yellow-400"}>
                      {tm.status}
                    </Badge>
                    {tm.expiry !== "N/A" && (
                      <div className="mt-2">
                        <p className="text-slate-500 text-xs">Expires</p>
                        <p className="text-slate-300 text-sm">{tm.expiry}</p>
                      </div>
                    )}
                  </div>
                </div>
                {tm.status === "registered" && (
                  <div className="mt-4 flex justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-amber-500/30 text-amber-400"
                      onClick={() => handleRenewRequest(tm.ref_code ?? tm.name)}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Renew Request
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-blue-400">Pending Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingApplications.map((app) => (
              <div key={app.id} className="flex justify-between items-center bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div>
                  <h4 className="text-white font-medium">{app.name}</h4>
                  <p className="text-slate-400 text-sm">Filed: {app.filed} • Region: {app.region}</p>
                </div>
                <Badge className="bg-blue-500/20 text-blue-400">{app.status.replace("_", " ")}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {expiringSoon.length > 0 && (
        <Card className="bg-slate-900/50 border-slate-700/50 border-l-4 border-l-yellow-500">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
              <div>
                <h4 className="text-yellow-400 font-medium">Expiry Alerts</h4>
                {expiringSoon.map((tm) => (
                  <p key={tm.id} className="text-slate-400 text-sm mt-1">
                    {tm.name} expires on {tm.expiry}. Consider initiating renewal process.
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default LegalTrademarksIP;
