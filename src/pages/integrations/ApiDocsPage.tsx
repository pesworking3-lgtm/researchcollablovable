import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Code, BookOpen, AlertTriangle, Gauge } from "lucide-react";

const ENDPOINTS = [
  { method: "GET", path: "/v1/projects", desc: "List your research projects", scope: "read:projects" },
  { method: "POST", path: "/v1/projects", desc: "Create a project", scope: "write:projects" },
  { method: "GET", path: "/v1/projects/:id/milestones", desc: "List milestones", scope: "read:projects" },
  { method: "POST", path: "/v1/citations/resolve", desc: "Resolve DOI → citation via Crossref", scope: "read:citations" },
  { method: "GET", path: "/v1/reputation/passport", desc: "Fetch signed reputation passport", scope: "read:reputation" },
  { method: "POST", path: "/v1/webhooks", desc: "Register a webhook endpoint", scope: "write:webhooks" },
  { method: "GET", path: "/v1/exports/:id", desc: "Download export artifact", scope: "read:exports" },
];

const ERRORS = [
  { code: 400, name: "bad_request", desc: "Invalid payload or missing fields" },
  { code: 401, name: "unauthenticated", desc: "Missing or invalid API key" },
  { code: 403, name: "forbidden", desc: "Key lacks required scope" },
  { code: 404, name: "not_found", desc: "Resource does not exist" },
  { code: 409, name: "conflict", desc: "State conflict (e.g. milestone already released)" },
  { code: 429, name: "rate_limited", desc: "Exceeded plan rate limit" },
  { code: 500, name: "internal_error", desc: "Unexpected error; safe to retry" },
];

export default function ApiDocsPage() {
  return (
    <>
      <Helmet><title>API Documentation — ResearchCollab</title></Helmet>
      <div className="container max-w-5xl mx-auto py-8 px-4 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="h-6 w-6" /> API Documentation</h1>
            <p className="text-sm text-muted-foreground">REST endpoints, scopes, error codes, and rate limits.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm"><Link to="/developer/api">API keys</Link></Button>
            <Button asChild variant="outline" size="sm"><Link to="/developer/webhooks">Webhooks</Link></Button>
          </div>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Code className="h-4 w-4" /> Base URL & Auth</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="font-mono bg-muted/40 rounded px-3 py-2 text-xs">https://api.researchcollab.online</div>
            <p className="text-muted-foreground">Send <code className="text-foreground">Authorization: Bearer rc_live_xxx</code> on every request. Create keys on the Developer API page.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Endpoints</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {ENDPOINTS.map((e) => (
              <div key={e.path} className="flex flex-wrap items-center gap-3 p-2 rounded bg-muted/30">
                <Badge variant="outline" className="font-mono text-[10px]">{e.method}</Badge>
                <code className="text-sm font-mono">{e.path}</code>
                <span className="text-xs text-muted-foreground flex-1">{e.desc}</span>
                <Badge variant="secondary" className="text-[10px]">{e.scope}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Error codes</CardTitle></CardHeader>
            <CardContent className="space-y-1.5">
              {ERRORS.map((e) => (
                <div key={e.code} className="flex items-center gap-3 text-xs">
                  <Badge variant="outline" className="font-mono w-12 justify-center">{e.code}</Badge>
                  <code className="font-mono">{e.name}</code>
                  <span className="text-muted-foreground flex-1">{e.desc}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base flex items-center gap-2"><Gauge className="h-4 w-4" /> Rate limits</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-xs">
              {[
                { plan: "Free", rate: "60 req/hour" },
                { plan: "Student Pro", rate: "600 req/hour" },
                { plan: "Researcher Pro", rate: "3,000 req/hour" },
                { plan: "Department", rate: "30,000 req/hour" },
              ].map((p) => (
                <div key={p.plan} className="flex justify-between border-b border-border/60 py-1 last:border-0">
                  <span>{p.plan}</span>
                  <span className="font-mono text-muted-foreground">{p.rate}</span>
                </div>
              ))}
              <p className="text-muted-foreground pt-2">429 responses include <code className="text-foreground">Retry-After</code> header.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
