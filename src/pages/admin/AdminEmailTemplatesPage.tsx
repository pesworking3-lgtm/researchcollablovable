import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const TEMPLATES = [
  { id: "welcome", name: "Welcome email", subject: "Welcome to ResearchCollab", lastEdited: "2025-10-22" },
  { id: "deal_funded", name: "Deal funded", subject: "Your escrow is now funded", lastEdited: "2025-10-18" },
  { id: "milestone", name: "Milestone completed", subject: "Milestone marked complete", lastEdited: "2025-10-15" },
  { id: "payout", name: "Payout released", subject: "Funds released to your wallet", lastEdited: "2025-10-10" },
];

export default function AdminEmailTemplatesPage() {
  const [selected, setSelected] = useState(TEMPLATES[0].id);
  const t = TEMPLATES.find((x) => x.id === selected)!;
  const [subject, setSubject] = useState(t.subject);
  const [body, setBody] = useState(`Hi {{user.name}},\n\nThis is a transactional message from ResearchCollab.\n\n— The team`);

  return (
    <>
      <Helmet><title>Email templates — Admin</title></Helmet>
      <div className="container max-w-6xl mx-auto py-8 px-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Email templates</h1>
          <p className="text-sm text-muted-foreground">Manage transactional email copy. Variables: <code className="text-xs">{`{{user.name}}`}</code>, <code className="text-xs">{`{{deal.id}}`}</code>.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-1">
            <CardHeader><CardTitle className="text-base">Templates</CardTitle></CardHeader>
            <CardContent className="space-y-1">
              {TEMPLATES.map((tpl) => (
                <button key={tpl.id} onClick={() => { setSelected(tpl.id); setSubject(tpl.subject); }}
                  className={`w-full text-left px-3 py-2 rounded text-sm ${selected === tpl.id ? "bg-muted font-medium" : "hover:bg-muted/50"}`}>
                  <div>{tpl.name}</div>
                  <div className="text-xs text-muted-foreground">edited {tpl.lastEdited}</div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">{t.name}</CardTitle>
              <Badge variant="secondary">Demo</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Subject</label>
                <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Body</label>
                <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={10} className="font-mono text-sm" />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => toast.success("Template saved")}>Save</Button>
                <Button variant="outline" onClick={() => toast.success("Test email sent (demo)")}>Send test</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
