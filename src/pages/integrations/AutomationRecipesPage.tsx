import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Zap, ArrowRight, Plus, Play, Pause, History, Github, Calendar, HardDrive, Mail, MessageSquare, FileText } from "lucide-react";

type Recipe = {
  id: string;
  name: string;
  trigger: { app: string; event: string; icon: JSX.Element };
  action: { app: string; event: string; icon: JSX.Element };
  enabled: boolean;
  runs: number;
  lastRun: string;
};

const TEMPLATES: Omit<Recipe, "id" | "enabled" | "runs" | "lastRun">[] = [
  { name: "Milestone → Calendar event", trigger: { app: "ResearchCollab", event: "Milestone created", icon: <Zap className="h-4 w-4" /> }, action: { app: "Google Calendar", event: "Create event", icon: <Calendar className="h-4 w-4" /> } },
  { name: "Report exported → Drive backup", trigger: { app: "ResearchCollab", event: "Report exported", icon: <FileText className="h-4 w-4" /> }, action: { app: "Google Drive", event: "Upload file", icon: <HardDrive className="h-4 w-4" /> } },
  { name: "GitHub commit → Project log", trigger: { app: "GitHub", event: "New commit", icon: <Github className="h-4 w-4" /> }, action: { app: "ResearchCollab", event: "Append activity", icon: <Zap className="h-4 w-4" /> } },
  { name: "Milestone complete → Email supervisor", trigger: { app: "ResearchCollab", event: "Milestone completed", icon: <Zap className="h-4 w-4" /> }, action: { app: "Email", event: "Send notification", icon: <Mail className="h-4 w-4" /> } },
  { name: "Citation added → WhatsApp team", trigger: { app: "ResearchCollab", event: "Citation added", icon: <Zap className="h-4 w-4" /> }, action: { app: "WhatsApp", event: "Send message", icon: <MessageSquare className="h-4 w-4" /> } },
  { name: "Deadline 24h → Calendar reminder", trigger: { app: "ResearchCollab", event: "Deadline approaching", icon: <Zap className="h-4 w-4" /> }, action: { app: "Google Calendar", event: "Create reminder", icon: <Calendar className="h-4 w-4" /> } },
];

const INITIAL: Recipe[] = [
  { id: "r1", ...TEMPLATES[0], enabled: true, runs: 42, lastRun: "12m ago" },
  { id: "r2", ...TEMPLATES[1], enabled: true, runs: 17, lastRun: "2h ago" },
  { id: "r3", ...TEMPLATES[3], enabled: false, runs: 0, lastRun: "—" },
];

export default function AutomationRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL);
  const [q, setQ] = useState("");

  const toggle = (id: string) => {
    setRecipes((rs) => rs.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
    toast.success("Recipe updated");
  };
  const addFromTemplate = (t: typeof TEMPLATES[number]) => {
    setRecipes((rs) => [...rs, { ...t, id: crypto.randomUUID(), enabled: true, runs: 0, lastRun: "—" }]);
    toast.success(`Enabled: ${t.name}`);
  };

  const filtered = TEMPLATES.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()));
  const active = recipes.filter((r) => r.enabled).length;
  const totalRuns = recipes.reduce((s, r) => s + r.runs, 0);

  return (
    <>
      <Helmet><title>Automation Recipes — ResearchCollab</title></Helmet>
      <div className="container max-w-6xl mx-auto py-8 px-4 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Zap className="h-6 w-6 text-primary" /> Automation Recipes</h1>
            <p className="text-sm text-muted-foreground">Chain triggers and actions across your connected integrations. Demo mode.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm"><Link to="/integrations">Integrations</Link></Button>
            <Button asChild variant="outline" size="sm"><Link to="/developer/webhooks">Webhooks</Link></Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Active recipes", value: active, icon: <Play className="h-4 w-4" /> },
            { label: "Total recipes", value: recipes.length, icon: <Zap className="h-4 w-4" /> },
            { label: "Runs (30d)", value: totalRuns, icon: <History className="h-4 w-4" /> },
            { label: "Templates", value: TEMPLATES.length, icon: <Plus className="h-4 w-4" /> },
          ].map((s) => (
            <Card key={s.label}><CardContent className="p-4 flex items-center justify-between">
              <div><div className="text-xs text-muted-foreground">{s.label}</div><div className="text-2xl font-bold">{s.value}</div></div>
              <div className="text-muted-foreground">{s.icon}</div>
            </CardContent></Card>
          ))}
        </div>

        <Tabs defaultValue="my">
          <TabsList>
            <TabsTrigger value="my">My recipes</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="my" className="space-y-3 mt-4">
            {recipes.length === 0 && (
              <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">No recipes yet. Browse templates to get started.</CardContent></Card>
            )}
            {recipes.map((r) => (
              <Card key={r.id}>
                <CardContent className="p-4 flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-[220px]">
                    <div className="font-medium">{r.name}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span className="inline-flex items-center gap-1">{r.trigger.icon} {r.trigger.app}: {r.trigger.event}</span>
                      <ArrowRight className="h-3 w-3" />
                      <span className="inline-flex items-center gap-1">{r.action.icon} {r.action.app}: {r.action.event}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{r.runs} runs · {r.lastRun}</Badge>
                  <div className="flex items-center gap-2">
                    {r.enabled ? <Badge>On</Badge> : <Badge variant="outline">Off</Badge>}
                    <Switch checked={r.enabled} onCheckedChange={() => toggle(r.id)} aria-label={`Toggle ${r.name}`} />
                    <Button variant="ghost" size="sm" onClick={() => toast.message(`Running ${r.name}…`)}>
                      {r.enabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="templates" className="space-y-3 mt-4">
            <Input placeholder="Search templates…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-sm" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filtered.map((t) => (
                <Card key={t.name}>
                  <CardHeader className="pb-2"><CardTitle className="text-sm">{t.name}</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1 rounded border px-2 py-1">{t.trigger.icon} {t.trigger.app}</span>
                      <ArrowRight className="h-3 w-3" />
                      <span className="inline-flex items-center gap-1 rounded border px-2 py-1">{t.action.icon} {t.action.app}</span>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => addFromTemplate(t)}><Plus className="h-3 w-3 mr-1" /> Use template</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
