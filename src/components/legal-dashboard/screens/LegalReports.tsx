import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle } from "lucide-react";

import { useLegalRecords } from "@/lib/legal-data";

const LegalReports = () => {
  const { data: regions = [] } = useLegalRecords("regional_compliance");
  const { data: gdpr = [] } = useLegalRecords("compliance_gdpr");
  const { data: kyc = [] } = useLegalRecords("compliance_kyc");
  const { data: dp = [] } = useLegalRecords("compliance_dp");
  const { data: incidents = [] } = useLegalRecords("incident");
  const { data: risks = [] } = useLegalRecords("risk_exposure");

  const checklist = [...gdpr, ...kyc, ...dp];
  const compliantItems = checklist.filter((i) => i.status === "compliant").length;
  const overall = checklist.length ? Math.round((compliantItems / checklist.length) * 100) : 0;
  const regionsCompliant = regions.filter((r) => r.status === "Compliant").length;
  const pendingReviews = checklist.filter((i) => i.status !== "compliant").length;

  const resolved = incidents.filter((i) => i.status === "resolved").length;
  const inProgress = incidents.filter((i) => i.status === "investigating" || i.status === "pending_action").length;
  const escalated = incidents.filter((i) => i.status === "escalated").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Legal Reports</h2>
        <div className="flex items-center gap-2 text-yellow-400 text-sm">
          <AlertTriangle className="h-4 w-4" />
          No export / No copy
        </div>
      </div>

      <Tabs defaultValue="compliance" className="w-full">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="compliance" className="data-[state=active]:bg-amber-600">Compliance</TabsTrigger>
          <TabsTrigger value="incidents" className="data-[state=active]:bg-amber-600">Incidents</TabsTrigger>
          <TabsTrigger value="risk" className="data-[state=active]:bg-amber-600">Risk Exposure</TabsTrigger>
        </TabsList>

        <TabsContent value="compliance" className="mt-4">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-amber-400">Compliance Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <p className="text-slate-400 text-sm">Overall Compliance</p>
                    <p className="text-3xl font-bold text-emerald-400 mt-2">{overall}%</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <p className="text-slate-400 text-sm">Regions Compliant</p>
                    <p className="text-3xl font-bold text-white mt-2">{regionsCompliant}/{regions.length}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <p className="text-slate-400 text-sm">Pending Reviews</p>
                    <p className="text-3xl font-bold text-yellow-400 mt-2">{pendingReviews}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {regions.map((region) => (
                    <div key={region.id} className="flex justify-between p-3 bg-slate-800/50 rounded">
                      <span className="text-slate-300">{region.name}</span>
                      <span className={region.status === "Compliant" ? "text-emerald-400" : "text-yellow-400"}>
                        {region.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents" className="mt-4">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-amber-400">Incident Resolution Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <p className="text-slate-400 text-sm">Total Incidents</p>
                    <p className="text-2xl font-bold text-white mt-2">{incidents.length}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <p className="text-slate-400 text-sm">Resolved</p>
                    <p className="text-2xl font-bold text-emerald-400 mt-2">{resolved}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <p className="text-slate-400 text-sm">In Progress</p>
                    <p className="text-2xl font-bold text-blue-400 mt-2">{inProgress}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <p className="text-slate-400 text-sm">Escalated</p>
                    <p className="text-2xl font-bold text-red-400 mt-2">{escalated}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {incidents.map((incident) => (
                    <div key={incident.id} className="flex justify-between p-3 bg-slate-800/50 rounded">
                      <span className="text-white text-sm">{incident.name}</span>
                      <span className="text-slate-400 text-xs">{incident.status.replace("_", " ")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="mt-4">
          <Card className="bg-slate-900/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-amber-400">Risk Exposure Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {risks.map((risk) => (
                  <div key={risk.id} className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white">{risk.name}</span>
                      <span className={
                        risk.status === "Low" ? "text-emerald-400" :
                        risk.status === "Medium" ? "text-yellow-400" :
                        "text-red-400"
                      }>{risk.status}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          risk.status === "Low" ? "bg-emerald-500" :
                          risk.status === "Medium" ? "bg-yellow-500" :
                          "bg-red-500"
                        }`}
                        style={{ width: `${risk.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default LegalReports;
