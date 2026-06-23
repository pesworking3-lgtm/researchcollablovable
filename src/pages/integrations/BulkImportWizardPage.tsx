import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Upload, CheckCircle2, AlertTriangle } from "lucide-react";

const STEPS = ["Upload file", "Preview", "Map fields", "Validate", "Confirm"];

export default function BulkImportWizardPage() {
  const [step, setStep] = useState(0);
  const [fileName, setFileName] = useState("");

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <>
      <Helmet><title>Bulk import — ResearchCollab</title></Helmet>
      <div className="container max-w-4xl mx-auto py-8 px-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Bulk import wizard</h1>
          <p className="text-sm text-muted-foreground">Import students, projects, or marketplace items from CSV/Excel.</p>
        </div>

        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              {STEPS.map((s, i) => (
                <div key={s} className="flex-1 flex items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{i + 1}</div>
                  <span className="ml-2 text-xs hidden md:inline">{s}</span>
                  {i < STEPS.length - 1 && <div className={`h-px flex-1 mx-2 ${i < step ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>
            <Progress value={((step + 1) / STEPS.length) * 100} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">{STEPS[step]}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {step === 0 && (
              <div className="space-y-3">
                <Input type="file" accept=".csv,.xlsx" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
                {fileName && <div className="text-sm text-muted-foreground flex items-center gap-2"><Upload className="h-4 w-4" />{fileName}</div>}
                <Button variant="outline" size="sm" onClick={() => toast.success("Template downloaded")}>Download CSV template</Button>
              </div>
            )}
            {step === 1 && (
              <div className="overflow-auto border rounded">
                <table className="w-full text-sm">
                  <thead className="bg-muted"><tr><th className="p-2 text-left">Name</th><th className="p-2 text-left">Email</th><th className="p-2 text-left">Department</th></tr></thead>
                  <tbody>
                    <tr className="border-t"><td className="p-2">Ali Khan</td><td className="p-2">ali@uni.pk</td><td className="p-2">CS</td></tr>
                    <tr className="border-t"><td className="p-2">Sara Ahmed</td><td className="p-2">sara@uni.pk</td><td className="p-2">EE</td></tr>
                    <tr className="border-t"><td className="p-2">Bilal R.</td><td className="p-2">bilal@uni.pk</td><td className="p-2">Physics</td></tr>
                  </tbody>
                </table>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-2 text-sm">
                {[["Column: Name", "→ full_name"], ["Column: Email", "→ email"], ["Column: Department", "→ department_id"]].map(([a, b]) => (
                  <div key={a} className="flex items-center justify-between border rounded p-2"><span>{a}</span><span className="text-muted-foreground">{b}</span></div>
                ))}
              </div>
            )}
            {step === 3 && (
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-green-600"><CheckCircle2 className="h-4 w-4" /> 247 rows valid</div>
                <div className="flex items-center gap-2 text-amber-600"><AlertTriangle className="h-4 w-4" /> 3 rows with warnings (duplicate email)</div>
              </div>
            )}
            {step === 4 && (
              <div className="space-y-2 text-sm">
                <Badge variant="default">Ready to import</Badge>
                <p className="text-muted-foreground">247 records will be created. 3 duplicates will be skipped.</p>
              </div>
            )}

            <div className="flex justify-between pt-2">
              <Button variant="ghost" onClick={prev} disabled={step === 0}>Back</Button>
              {step < STEPS.length - 1 ? (
                <Button onClick={next}>Continue</Button>
              ) : (
                <Button onClick={() => toast.success("Import completed (demo)")}>Confirm import</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
