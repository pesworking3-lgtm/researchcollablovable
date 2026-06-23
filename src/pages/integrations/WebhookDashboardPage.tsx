import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { CheckCircle2, XCircle, RotateCw } from "lucide-react";

interface Hook { id: string; url: string; events: string[]; status: "active" | "failing"; lastDelivery: string; }
interface Delivery { id: string; event: string; status: number; at: string; payload: string; }

const HOOKS: Hook[] = [
  { id: "wh_01", url: "https://example.com/rc/webhook", events: ["deal.funded", "milestone.completed"], status: "active", lastDelivery: "2m ago" },
  { id: "wh_02", url: "https://lab.uni.edu/rc/hook", events: ["project.created"], status: "failing", lastDelivery: "1h ago (503)" },
];

const DELIVERIES: Delivery[] = [
  { id: "d1", event: "deal.funded", status: 200, at: "14:22:01", payload: `{"deal_id":"d_123","amount":50000}` },
  { id: "d2", event: "milestone.completed", status: 200, at: "14:20:14", payload: `{"milestone_id":"m_88"}` },
  { id: "d3", event: "project.created", status: 503, at: "13:18:55", payload: `{"project_id":"p_42"}` },
];

export default function WebhookDashboardPage() {
  const [selected, setSelected] = useState<Delivery | null>(null);
  const [url, setUrl] = useState("");

  return (
    <>
      <Helmet><title>Webhooks — ResearchCollab</title></Helmet>
      <div className="container max-w-6xl mx-auto py-8 px-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Webhooks</h1>
          <p className="text-sm text-muted-foreground">Receive HTTP callbacks when events happen in ResearchCollab.</p>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">Add endpoint</CardTitle></CardHeader>
          <CardContent className="flex gap-2">
            <Input placeholder="https://your-app.example.com/webhook" value={url} onChange={(e) => setUrl(e.target.value)} />
            <Button onClick={() => { toast.success("Webhook endpoint added (demo)"); setUrl(""); }}>Add</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Endpoints</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {HOOKS.map((h) => (
              <div key={h.id} className="flex items-center justify-between border-b last:border-0 py-2">
                <div className="space-y-1">
                  <div className="font-mono text-sm">{h.url}</div>
                  <div className="flex gap-1 flex-wrap">
                    {h.events.map((e) => <Badge key={e} variant="outline" className="text-[10px]">{e}</Badge>)}
                  </div>
                  <div className="text-xs text-muted-foreground">Last delivery: {h.lastDelivery}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={h.status === "active" ? "default" : "destructive"}>{h.status}</Badge>
                  <Button size="sm" variant="outline" onClick={() => toast.success("Test event sent")}><RotateCw className="h-3 w-3 mr-1" />Test</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Recent deliveries</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            {DELIVERIES.map((d) => (
              <button key={d.id} onClick={() => setSelected(d)} className="w-full flex items-center justify-between border-b last:border-0 py-2 text-sm hover:bg-muted/50 px-2 rounded">
                <div className="flex items-center gap-3">
                  {d.status < 300 ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-destructive" />}
                  <span className="font-mono">{d.event}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>HTTP {d.status}</span>
                  <span>{d.at}</span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>Delivery {selected?.id}</DialogTitle></DialogHeader>
            <div className="space-y-2 text-sm">
              <div><span className="text-muted-foreground">Event:</span> <span className="font-mono">{selected?.event}</span></div>
              <div><span className="text-muted-foreground">Status:</span> HTTP {selected?.status}</div>
              <pre className="bg-muted p-3 rounded text-xs overflow-auto">{selected?.payload}</pre>
              <Button size="sm" variant="outline" onClick={() => toast.success("Redelivered")}>Redeliver</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
