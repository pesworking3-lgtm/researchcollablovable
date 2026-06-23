import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LOGS = [
  { at: "14:22:01", source: "Google Drive", action: "File uploaded", status: "ok", detail: "report-q3.pdf → /Reports" },
  { at: "14:20:14", source: "Calendar", action: "Event synced", status: "ok", detail: "Milestone review — Nov 5" },
  { at: "13:18:55", source: "GitHub", action: "Webhook delivery failed", status: "error", detail: "503 from endpoint" },
  { at: "12:05:11", source: "ORCID", action: "Profile refresh", status: "ok", detail: "0000-0002-1234-5678" },
  { at: "11:40:00", source: "Crossref", action: "DOI resolved", status: "ok", detail: "10.1038/s41586-021-03819-2" },
  { at: "10:12:33", source: "Stripe", action: "Demo payment intent", status: "warn", detail: "Demo mode — no charge" },
];

export default function IntegrationActivityLogPage() {
  return (
    <>
      <Helmet><title>Integration activity — ResearchCollab</title></Helmet>
      <div className="container max-w-5xl mx-auto py-8 px-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Integration activity</h1>
          <p className="text-sm text-muted-foreground">Recent events across all connected integrations.</p>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {LOGS.map((l, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 text-sm">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-muted-foreground w-20">{l.at}</span>
                    <span className="font-medium w-32">{l.source}</span>
                    <span>{l.action}</span>
                    <span className="text-muted-foreground text-xs">{l.detail}</span>
                  </div>
                  <Badge variant={l.status === "ok" ? "default" : l.status === "warn" ? "secondary" : "destructive"}>{l.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
