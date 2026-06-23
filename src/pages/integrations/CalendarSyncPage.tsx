import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Calendar as CalendarIcon } from "lucide-react";

const EVENTS = [
  { title: "Milestone review — Solar Cells", at: "Nov 5, 14:00", source: "Google Calendar" },
  { title: "Supervisor sync — Ali Khan", at: "Nov 6, 10:00", source: "Outlook" },
  { title: "Demo day", at: "Nov 12, 16:00", source: "ICS feed" },
];

export default function CalendarSyncPage() {
  return (
    <>
      <Helmet><title>Calendar sync — ResearchCollab</title></Helmet>
      <div className="container max-w-4xl mx-auto py-8 px-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Calendar sync</h1>
          <p className="text-sm text-muted-foreground">Push project milestones and meetings to your calendar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Google Calendar", connected: true },
            { name: "Outlook Calendar", connected: false },
            { name: "ICS feed (subscribe)", connected: true },
          ].map((p) => (
            <Card key={p.name}>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{p.name}</div>
                  <Badge variant={p.connected ? "default" : "secondary"}>{p.connected ? "Connected" : "Off"}</Badge>
                </div>
                <Button size="sm" variant="outline" onClick={() => toast.success(`${p.name} ${p.connected ? "resynced" : "connected"} (demo)`)}>
                  {p.connected ? "Resync" : "Connect"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">Upcoming synced events</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {EVENTS.map((e) => (
              <div key={e.title} className="flex items-center justify-between border-b last:border-0 py-2 text-sm">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{e.title}</div>
                    <div className="text-xs text-muted-foreground">{e.at} • {e.source}</div>
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => toast.message("Opened in calendar")}>Open</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
