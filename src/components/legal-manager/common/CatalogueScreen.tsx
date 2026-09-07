import type { ReactNode } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConfirmButton } from "./ConfirmButton";
import { CatalogueSection, type CatalogueColumn } from "./CatalogueSection";
import { useLegalRecords, useUpdateRecordStatus, type LegalRecord } from "@/lib/legal-data";

export interface CatalogueAction {
  label: string;
  status: string;
  /** Audit-trail action name. */
  action: string;
  icon?: React.ComponentType<{ className?: string }>;
  confirm?: boolean;
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary";
}

export interface CatalogueTile {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  value?: string;
  hint?: string;
}

interface CatalogueScreenProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  tableTitle: string;
  columns: CatalogueColumn[];
  focusLabel?: string | null;
  actions?: CatalogueAction[];
  tiles?: CatalogueTile[];
  emptyTitle?: string;
  emptyDescription?: string;
  children?: ReactNode;
}

export const statusBadge = (status: string) => {
  const value = String(status ?? "").toLowerCase();
  const tone =
    ["active", "bound", "approved", "compliant", "protected", "published", "resolved", "enabled", "registered"].includes(value)
      ? "bg-emerald-500/15 text-emerald-400"
      : ["pending", "review", "review_needed", "draft", "monitoring"].includes(value)
        ? "bg-yellow-500/15 text-yellow-400"
        : ["rejected", "expired", "violation", "concern", "blocked", "critical"].includes(value)
          ? "bg-red-500/15 text-red-400"
          : "bg-muted/30 text-muted-foreground";
  return <Badge className={tone}>{value.replace(/_/g, " ") || "unknown"}</Badge>;
};

/** Shared screen scaffold: hero row, KPI tiles and a fully interactive record table. */
export const CatalogueScreen = ({
  title,
  description,
  icon: Icon,
  category,
  tableTitle,
  columns,
  focusLabel,
  actions = [],
  tiles = [],
  emptyTitle,
  emptyDescription,
  children,
}: CatalogueScreenProps) => {
  const { data: records = [], isLoading, isError, error, refetch } = useLegalRecords(category);
  const updateRecord = useUpdateRecordStatus();

  const runAction = (record: LegalRecord, config: CatalogueAction) => {
    updateRecord.mutate(
      {
        id: record.id,
        category,
        status: config.status,
        action: config.action,
        details: `${record.ref_code ?? record.name} → ${config.status}`,
      },
      {
        onSuccess: () => toast.success(`${config.label}: ${record.name}`),
        onError: (mutationError) => toast.error(mutationError.message),
      },
    );
  };

  const renderActions = (record: LegalRecord, compact: boolean) =>
    actions
      .filter((config) => String(record.status).toLowerCase() !== config.status)
      .map((config) => {
        const ActionIcon = config.icon;
        const content = (
          <>
            {ActionIcon && <ActionIcon className={compact ? "h-4 w-4" : "mr-2 h-4 w-4"} />}
            {!compact && config.label}
          </>
        );
        return config.confirm ? (
          <ConfirmButton
            key={config.label}
            size="sm"
            variant={config.variant ?? "ghost"}
            title={`${config.label}?`}
            description={`This updates ${record.name} to "${config.status}" and writes an entry to the immutable audit trail.`}
            confirmLabel={config.label}
            onConfirm={() => runAction(record, config)}
            aria-label={`${config.label} ${record.name}`}
            disabled={updateRecord.isPending}
          >
            {content}
          </ConfirmButton>
        ) : (
          <Button
            key={config.label}
            size="sm"
            variant={config.variant ?? "ghost"}
            onClick={() => runAction(record, config)}
            aria-label={`${config.label} ${record.name}`}
            disabled={updateRecord.isPending}
          >
            {content}
          </Button>
        );
      });

  return (
    <div className="space-y-5" aria-label={title} data-description={description}>
      {tiles.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {tiles.map((tile) => (
            <Card key={tile.label} className="h-full border-border bg-card/80">
                <CardContent className="p-4">
                  <div className="mb-3 grid h-8 w-8 place-items-center rounded-lg bg-primary/10">
                    <tile.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{tile.label}</p>
                  {tile.value && (
                    <p className="mt-1 text-2xl font-bold text-foreground">{tile.value}</p>
                  )}
                  {tile.hint && <p className="mt-1 text-xs text-muted-foreground">{tile.hint}</p>}
                </CardContent>
              </Card>
          ))}
        </div>
      )}

      {children}

      <CatalogueSection
        title={tableTitle}
        icon={Icon}
        records={records}
        columns={columns}
        isLoading={isLoading}
        isError={isError}
        error={error as { message?: string } | null}
        onRetry={() => void refetch()}
        focusLabel={focusLabel ?? null}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
        rowActions={(record) => renderActions(record, true)}
        drawerActions={(record) => renderActions(record, false)}
      />
    </div>
  );
};

export default CatalogueScreen;
