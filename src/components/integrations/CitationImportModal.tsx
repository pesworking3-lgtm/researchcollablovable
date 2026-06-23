import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export interface CitationImportModalProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onImport?: (citation: { title: string; source: string }) => void;
}

export function CitationImportModal({ open, onOpenChange, onImport }: CitationImportModalProps) {
  const [doi, setDoi] = useState("");
  const [bibtex, setBibtex] = useState("");
  const [title, setTitle] = useState("");

  const handle = (source: string, value: string) => {
    if (!value.trim()) { toast.error("Enter a value"); return; }
    onImport?.({ title: value.slice(0, 60), source });
    toast.success(`Citation imported via ${source}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>Import citation</DialogTitle></DialogHeader>
        <Tabs defaultValue="doi">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="doi">DOI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
            <TabsTrigger value="bibtex">BibTeX</TabsTrigger>
            <TabsTrigger value="ris">RIS</TabsTrigger>
          </TabsList>
          <TabsContent value="doi" className="space-y-3 pt-3">
            <Input placeholder="10.1038/s41586-021-03819-2" value={doi} onChange={(e) => setDoi(e.target.value)} />
            <Button onClick={() => handle("DOI", doi)}>Resolve via Crossref</Button>
          </TabsContent>
          <TabsContent value="manual" className="space-y-3 pt-3">
            <Input placeholder="Paper title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Button onClick={() => handle("manual", title)}>Add</Button>
          </TabsContent>
          <TabsContent value="bibtex" className="space-y-3 pt-3">
            <Textarea rows={6} placeholder="@article{...}" value={bibtex} onChange={(e) => setBibtex(e.target.value)} className="font-mono text-xs" />
            <Button onClick={() => handle("BibTeX", bibtex)}>Parse</Button>
          </TabsContent>
          <TabsContent value="ris" className="space-y-3 pt-3">
            <Textarea rows={6} placeholder="TY  - JOUR..." className="font-mono text-xs" />
            <Button onClick={() => handle("RIS", "ris-entry")}>Parse</Button>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
