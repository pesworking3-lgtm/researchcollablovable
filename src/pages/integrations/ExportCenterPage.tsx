import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, FileSpreadsheet, Presentation, Code2 } from "lucide-react";
import { toast } from "sonner";

const FORMATS = [
  { id: "pdf", name: "PDF", icon: <FileText className="h-5 w-5" />, desc: "Reports, certificates, invoices" },
  { id: "docx", name: "Word (DOCX)", icon: <FileText className="h-5 w-5" />, desc: "Editable report drafts" },
  { id: "xlsx", name: "Excel (XLSX)", icon: <FileSpreadsheet className="h-5 w-5" />, desc: "Tabular data, ledgers, lists" },
  { id: "csv", name: "CSV", icon: <FileSpreadsheet className="h-5 w-5" />, desc: "Raw data extracts" },
  { id: "pptx", name: "PowerPoint", icon: <Presentation className="h-5 w-5" />, desc: "Auto-generated slide deck" },
  { id: "json", name: "JSON", icon: <Code2 className="h-5 w-5" />, desc: "Developer-friendly raw export" },
];

const RECENT = [
  { name: "Q3 Department Report.pdf", at: "2025-11-01 14:22", size: "1.8 MB" },
  { name: "Marketplace orders.csv", at: "2025-10-29 09:10", size: "412 KB" },
  { name: "Project: Solar Cells slides.pptx", at: "2025-10-25 16:40", size: "3.1 MB" },
];

export default function ExportCenterPage() {
  return (
    <>
      <Helmet><title>Export Center — ResearchCollab</title></Helmet>
      <div className="container max-w-5xl mx-auto py-8 px-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Export Center</h1>
          <p className="text-sm text-muted-foreground">Download reports, data, and presentations in your preferred format.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FORMATS.map((f) => (
            <Card key={f.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">{f.icon}</div>
                  <div>
                    <div className="font-semibold">{f.name}</div>
                    <div className="text-xs text-muted-foreground">{f.desc}</div>
                  </div>
                </div>
                <Button size="sm" className="w-full" onClick={() => toast.success(`${f.name} export queued`)}>Export</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">Recent exports</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {RECENT.map((r) => (
              <div key={r.name} className="flex items-center justify-between border-b last:border-0 py-2 text-sm">
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.at} • {r.size}</div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary">Ready</Badge>
                  <Button size="sm" variant="outline" onClick={() => toast.success("Download started")}>Download</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
