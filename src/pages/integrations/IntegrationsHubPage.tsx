import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { IntegrationCard } from "@/components/integrations/IntegrationCard";
import { toast } from "sonner";
import {
  HardDrive, Github, Calendar, Video, BookOpen, CreditCard, Mail, MessageSquare,
  GraduationCap, FileText, Database, Webhook, Key,
} from "lucide-react";
import { useState } from "react";

const INTEGRATIONS = [
  { name: "Google Drive", category: "Storage", description: "Sync research files and exports", icon: <HardDrive className="h-5 w-5" />, connected: true, lastSync: "2h ago" },
  { name: "GitHub", category: "Code", description: "Link repositories to projects", icon: <Github className="h-5 w-5" />, connected: false },
  { name: "Google Calendar", category: "Calendar", description: "Sync milestones and meetings", icon: <Calendar className="h-5 w-5" />, connected: true, lastSync: "10m ago" },
  { name: "Outlook Calendar", category: "Calendar", description: "Two-way calendar sync", icon: <Calendar className="h-5 w-5" />, connected: false },
  { name: "Zoom", category: "Meetings", description: "Auto-create meeting rooms", icon: <Video className="h-5 w-5" />, connected: false, premium: true },
  { name: "Google Meet", category: "Meetings", description: "Embed meet links in workroom", icon: <Video className="h-5 w-5" />, connected: false },
  { name: "ORCID", category: "Identity", description: "Verify researcher identity", icon: <GraduationCap className="h-5 w-5" />, connected: true, lastSync: "1d ago" },
  { name: "Crossref", category: "Citations", description: "Resolve DOIs to citations", icon: <BookOpen className="h-5 w-5" />, connected: true, lastSync: "—" },
  { name: "Semantic Scholar", category: "Citations", description: "Literature discovery API", icon: <BookOpen className="h-5 w-5" />, connected: false },
  { name: "Stripe", category: "Payments", description: "Demo mode — no real payouts", icon: <CreditCard className="h-5 w-5" />, connected: false, error: "Demo mode only" },
  { name: "PayPal", category: "Payments", description: "Demo mode — no real payouts", icon: <CreditCard className="h-5 w-5" />, connected: false, error: "Demo mode only" },
  { name: "Email (SMTP)", category: "Messaging", description: "Transactional email delivery", icon: <Mail className="h-5 w-5" />, connected: true, lastSync: "live" },
  { name: "WhatsApp Business", category: "Messaging", description: "Notify students on milestones", icon: <MessageSquare className="h-5 w-5" />, connected: false, premium: true },
  { name: "LMS (Canvas/Moodle)", category: "Academic", description: "Push grades back to LMS", icon: <GraduationCap className="h-5 w-5" />, connected: false, premium: true },
];

export default function IntegrationsHubPage() {
  const [q, setQ] = useState("");
  const filtered = INTEGRATIONS.filter((i) =>
    (i.name + i.category + i.description).toLowerCase().includes(q.toLowerCase())
  );
  const connected = INTEGRATIONS.filter((i) => i.connected).length;

  return (
    <>
      <Helmet><title>Integrations Hub — ResearchCollab</title></Helmet>
      <div className="container max-w-7xl mx-auto py-8 px-4 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Integrations</h1>
            <p className="text-sm text-muted-foreground">Connect ResearchCollab to your existing tools. Payment providers are in demo mode.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm"><Link to="/settings/connected-accounts">Connected accounts</Link></Button>
            <Button asChild variant="outline" size="sm"><Link to="/developer/api">API & webhooks</Link></Button>
            <Button asChild variant="outline" size="sm"><Link to="/integrations/activity">Activity log</Link></Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Connected", value: connected, icon: <Database className="h-4 w-4" /> },
            { label: "Available", value: INTEGRATIONS.length, icon: <Key className="h-4 w-4" /> },
            { label: "Webhooks", value: 3, icon: <Webhook className="h-4 w-4" /> },
            { label: "API keys", value: 1, icon: <FileText className="h-4 w-4" /> },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                  <div className="text-2xl font-bold">{s.value}</div>
                </div>
                <div className="text-muted-foreground">{s.icon}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Input placeholder="Search integrations…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-sm" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((i) => (
            <IntegrationCard
              key={i.name}
              {...i}
              onConnect={() => toast.success(`${i.name} connect flow opened (demo)`) }
              onManage={() => toast.message(`Managing ${i.name}`)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
