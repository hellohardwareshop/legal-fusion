import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Clock, AlertTriangle, Users, FileText, Eye, Check, X } from "lucide-react";
import { toast } from "sonner";

import { useLegalRecords, useUpdateRecordStatus } from "@/lib/legal-data";

interface LMNotificationsProps {
  activeSubSection: string;
}


const LMNotifications = ({ activeSubSection }: LMNotificationsProps) => {
  const { data: notifications = [] } = useLegalRecords("notification");
  const updateRecord = useUpdateRecordStatus();
  const handleAction = (action: string, item: string) => {
    const toastMap: Record<string, () => void> = {
      view: () => toast.info(`Viewing: ${item}`),
      dismiss: () => toast.success(`Dismissed: ${item}`),
      action: () => toast.success(`Taking action on: ${item}`),
    };
    toastMap[action]?.();
  };

  const updateNotification = (item: (typeof notifications)[number], status: string, action: string) => {
    updateRecord.mutate(
      {
        id: item.id,
        category: "notification",
        status,
        action,
        details: `${item.title ?? item.name} set to ${status}`,
      },
      {
        onSuccess: () => toast.success(`${action}: ${item.title ?? item.name}`),
        onError: (error) => toast.error(error.message),
      },
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500/20 text-red-400 border-red-500/50";
      case "high": return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      default: return "bg-blue-500/20 text-blue-400 border-blue-500/50";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-600 to-orange-800 flex items-center justify-center shadow-lg">
          <Bell className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Legal alerts and notifications</p>
        </div>
        <Badge className="bg-red-500/20 text-red-400 border-red-500/50 ml-auto">{notifications.length} Active</Badge>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Clock, label: "Expiry Alerts", count: 2, onClick: () => handleAction("view", "Expiry Alerts") },
          { icon: AlertTriangle, label: "Violations", count: 1, onClick: () => handleAction("view", "Violation Alerts") },
          { icon: Users, label: "Pending", count: 1, onClick: () => handleAction("view", "Pending Acceptances") },
          { icon: FileText, label: "Policy Changes", count: 1, onClick: () => handleAction("view", "Policy Change Alerts") },
        ].map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="cursor-pointer hover:scale-105 transition-transform bg-orange-500/10 border-orange-500/30"
              onClick={action.onClick}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <action.icon className="w-6 h-6 text-orange-400" />
                  <Badge className="bg-orange-500/20 text-orange-400">{action.count}</Badge>
                </div>
                <p className="text-sm font-medium text-foreground">{action.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Notifications List */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-400" />
            All Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-600/20 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleAction("view", notification.title)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8" disabled={updateRecord.isPending} onClick={() => updateNotification(notification, "under_review", "Notification Assigned")}>
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8" disabled={updateRecord.isPending} onClick={() => updateNotification(notification, "dismissed", "Notification Dismissed")}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LMNotifications;
