import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useUpgradeModal } from "@/contexts/UpgradeModalContext";

export interface IntegrationCardProps {
  name: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  connected?: boolean;
  lastSync?: string;
  error?: string;
  premium?: boolean;
  onConnect?: () => void;
  onManage?: () => void;
}

export function IntegrationCard({
  name, category, description, icon, connected, lastSync, error, premium, onConnect, onManage,
}: IntegrationCardProps) {
  const upgrade = useUpgradeModal();
  const locked = premium && !connected;

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">{icon}</div>
            <div>
              <div className="font-semibold leading-tight">{name}</div>
              <div className="text-xs text-muted-foreground">{category}</div>
            </div>
          </div>
          {connected ? (
            <Badge variant="default">Connected</Badge>
          ) : premium ? (
            <Badge variant="outline" className="gap-1"><Lock className="h-3 w-3" /> Premium</Badge>
          ) : (
            <Badge variant="secondary">Not connected</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        {connected && lastSync && (
          <div className="text-xs text-muted-foreground">Last sync: {lastSync}</div>
        )}
        {error && <div className="text-xs text-destructive">{error}</div>}
        <div className="flex gap-2 pt-1">
          {connected ? (
            <Button size="sm" variant="outline" onClick={onManage}>Manage</Button>
          ) : locked ? (
            <Button size="sm" onClick={() => upgrade.prompt({ feature: name, reason: `${name} requires a premium plan`, recommendedPlan: "researcher_pro" })}>Upgrade to connect</Button>
          ) : (
            <Button size="sm" onClick={onConnect}>Connect</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
