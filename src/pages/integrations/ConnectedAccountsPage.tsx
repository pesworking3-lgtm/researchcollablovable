import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ACCOUNTS = [
  { provider: "Google", email: "ali@university.edu.pk", scopes: ["Drive", "Calendar"], status: "active", connectedAt: "2025-09-12" },
  { provider: "ORCID", email: "0000-0002-1234-5678", scopes: ["Profile"], status: "active", connectedAt: "2025-08-01" },
  { provider: "GitHub", email: "—", scopes: [], status: "disconnected", connectedAt: null },
];

export default function ConnectedAccountsPage() {
  return (
    <>
      <Helmet><title>Connected accounts — ResearchCollab</title></Helmet>
      <div className="container max-w-4xl mx-auto py-8 px-4 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold">Connected accounts</h1>
            <p className="text-sm text-muted-foreground">Manage third-party accounts linked to your profile.</p>
          </div>
          <Button asChild variant="outline" size="sm"><Link to="/integrations">Browse integrations</Link></Button>
        </div>

        <div className="space-y-3">
          {ACCOUNTS.map((a) => (
            <Card key={a.provider}>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{a.provider}</span>
                    <Badge variant={a.status === "active" ? "default" : "secondary"}>{a.status}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{a.email}</div>
                  {a.scopes.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {a.scopes.map((s) => <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>)}
                    </div>
                  )}
                  {a.connectedAt && <div className="text-xs text-muted-foreground">Connected {a.connectedAt}</div>}
                </div>
                <div className="flex gap-2">
                  {a.status === "active" ? (
                    <>
                      <Button size="sm" variant="outline" onClick={() => toast.success(`${a.provider} re-synced`)}>Resync</Button>
                      <Button size="sm" variant="destructive" onClick={() => toast.message(`${a.provider} disconnected (demo)`)}>Disconnect</Button>
                    </>
                  ) : (
                    <Button size="sm" onClick={() => toast.success(`${a.provider} connect flow opened`)}>Reconnect</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">Permissions notice</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            ResearchCollab requests only scopes required for each integration. Revoking access here will not delete data already imported.
          </CardContent>
        </Card>
      </div>
    </>
  );
}
