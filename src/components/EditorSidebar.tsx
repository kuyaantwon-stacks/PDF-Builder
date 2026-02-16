
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LayoutArchetype, PageContent } from "@/lib/types";
import { Plus, Trash2, FileText, Settings, Wand2, Download } from "lucide-react";
import { selectLayoutArchetype } from "@/ai/flows/intelligent-layout-selection";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface EditorSidebarProps {
  pages: PageContent[];
  onAddPage: () => void;
  onUpdatePage: (id: string, updates: Partial<PageContent>) => void;
  onDeletePage: (id: string) => void;
  onPrint: () => void;
}

export default function EditorSidebar({ pages, onAddPage, onUpdatePage, onDeletePage, onPrint }: EditorSidebarProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSmartLayout = async (page: PageContent) => {
    setIsAnalyzing(true);
    try {
      const result = await selectLayoutArchetype({ pageContent: page.title + " " + page.body });
      onUpdatePage(page.id, { archetype: result.layoutArchetype as LayoutArchetype });
      toast({ title: "Intelligence Applied", description: `Selected ${result.layoutArchetype} archetype for this content.` });
    } catch (error) {
      toast({ variant: "destructive", title: "AI Error", description: "Failed to determine layout." });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-[400px] border-r bg-white h-screen flex flex-col no-print">
      <div className="p-6 border-b bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-headline font-bold text-lg">PDF Powerhouse</h1>
            <p className="text-[10px] uppercase font-bold tracking-widest opacity-50">Enterprise V5.1</p>
          </div>
        </div>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-headline font-bold text-slate-800">Document Structure</h2>
          <Button size="sm" onClick={onAddPage} className="gap-2">
            <Plus className="w-4 h-4" /> Add Page
          </Button>
        </div>

        {pages.map((page, idx) => (
          <Card key={page.id} className="border-2 hover:border-primary/20 transition-all">
            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-headline">Page {idx + 1}</CardTitle>
              <div className="flex gap-1">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 text-primary" 
                  onClick={() => handleSmartLayout(page)}
                  disabled={isAnalyzing}
                >
                  <Wand2 className="w-4 h-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-8 w-8 text-destructive" 
                  onClick={() => onDeletePage(page.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase opacity-50">Title</label>
                <Input 
                  value={page.title} 
                  onChange={(e) => onUpdatePage(page.id, { title: e.target.value })}
                  placeholder="Publication Heading"
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase opacity-50">Body Content</label>
                <Textarea 
                  value={page.body} 
                  onChange={(e) => onUpdatePage(page.id, { body: e.target.value })}
                  placeholder="Architectural prose..."
                  className="text-sm min-h-[80px]"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1 space-y-1.5">
                  <label className="text-[10px] font-bold uppercase opacity-50">Archetype</label>
                  <select 
                    value={page.archetype}
                    onChange={(e) => onUpdatePage(page.id, { archetype: e.target.value as LayoutArchetype })}
                    className="w-full h-8 rounded-md border border-input bg-background px-2 py-1 text-xs outline-none"
                  >
                    <option value="Hero">Hero</option>
                    <option value="Bento">Bento</option>
                    <option value="Inquiry">Inquiry</option>
                    <option value="Visual Break">Visual Break</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 pt-4">
                  <input 
                    type="checkbox" 
                    checked={page.isDark} 
                    onChange={(e) => onUpdatePage(page.id, { isDark: e.target.checked })}
                    id={`dark-${page.id}`}
                  />
                  <label htmlFor={`dark-${page.id}`} className="text-[10px] font-bold uppercase opacity-50 cursor-pointer">Dark Page</label>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-6 border-t bg-slate-50 space-y-3">
        <Button className="w-full h-12 gap-2 shadow-lg" onClick={onPrint}>
          <Download className="w-5 h-5" /> Export PDF (144 DPI)
        </Button>
        <p className="text-[10px] text-center opacity-50 font-medium">
          Retina Display Mode Enabled
        </p>
      </div>
    </div>
  );
}
