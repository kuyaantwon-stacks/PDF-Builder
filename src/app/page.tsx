"use client";

import { useState, useEffect } from "react";
import { PageContent } from "@/lib/types";
import EditorSidebar from "@/components/EditorSidebar";
import PageWrapper from "@/components/pdf/PageWrapper";
import { HeroLayout, BentoLayout, InquiryLayout, VisualBreakLayout } from "@/components/pdf/Archetypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Loader2, Download, RefreshCcw, Cpu } from "lucide-react";
import { generateDocument } from "@/ai/flows/generate-document-flow";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function PDFPowerhouse() {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fake progress simulation for the multi-stop gradient bar
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => (prev < 90 ? prev + Math.random() * 5 : prev));
      }, 800);
    } else {
      setProgress(100);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    try {
      const result = await generateDocument({ topic });
      setPages(result.pages);
      toast({
        title: "Architecture Complete",
        description: `Drafted 20-page executive publication for "${result.title}".`,
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Architectural Failure",
        description: "The AI Command Center lost connection. Please retry.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdatePage = (id: string, updates: Partial<PageContent>) => {
    setPages(pages.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleDeletePage = (id: string) => {
    setPages(pages.filter(p => p.id !== id));
  };

  const handleAddPage = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setPages([...pages, {
      id: newId,
      title: "New Strategic Section",
      body: "Drafting content...",
      archetype: "Bento",
      theme: "Minimal"
    }]);
  };

  if (!mounted) return null;

  if (pages.length === 0) {
    return (
      <div className="min-h-screen obsidian-bg flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
        {/* Firebase Orbs */}
        <div className="orb orb-blue -top-20 -left-20" />
        <div className="orb orb-purple bottom-20 -right-20" />
        
        <div className="max-w-3xl w-full space-y-16 text-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card border-primary/30 text-primary font-bold text-[10px] uppercase tracking-[0.3em] animate-pulse">
              <Cpu className="w-4 h-4" /> AI Command Center v5.0
            </div>
            <h1 className="text-7xl font-black font-headline tracking-tighter leading-[0.9] text-white">
              Executive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Intelligence.</span>
            </h1>
            <p className="text-xl text-white/50 font-medium max-w-xl mx-auto">
              Transform raw concepts into 20-page boardroom-ready publications with Google-grade aesthetics.
            </p>
          </div>

          <div className="glass-card p-10 rounded-[40px] space-y-8">
            <form onSubmit={handleGenerate} className="relative group">
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Briefly describe your document topic..."
                className="h-24 bg-white/5 border-white/10 rounded-[32px] px-10 text-2xl focus:bg-white/10 focus:border-blue-500/50 transition-all placeholder:text-white/10 text-white"
                disabled={isGenerating}
              />
              <Button 
                size="lg"
                className="absolute right-4 top-4 bottom-4 rounded-[24px] px-10 gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold glow-pill border-none"
                disabled={isGenerating || !topic.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Initializing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    Generate PDF
                  </>
                )}
              </Button>
            </form>

            {isGenerating && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                  <span>Synthesizing Architecture</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full google-progress transition-all duration-500" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-12 opacity-30 pt-10">
            <div className="space-y-1">
              <p className="font-bold text-white">20 Pages</p>
              <p className="text-[9px] uppercase tracking-widest text-white/60">Global Scope</p>
            </div>
            <div className="space-y-1 border-x border-white/10">
              <p className="font-bold text-white">4.5:1 Ratio</p>
              <p className="text-[9px] uppercase tracking-widest text-white/60">Legibility Protocol</p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-white">32px Radius</p>
              <p className="text-[9px] uppercase tracking-widest text-white/60">Modern Esthetic</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#E6EBF5]">
      <EditorSidebar 
        pages={pages} 
        onAddPage={handleAddPage} 
        onUpdatePage={handleUpdatePage} 
        onDeletePage={handleDeletePage}
        onPrint={() => window.print()}
      />
      
      <main className="flex-1 overflow-y-auto p-12 bg-slate-200/50 flex flex-col items-center">
        <div className="w-[816px] mb-8 no-print p-4 rounded-[24px] bg-white/60 border border-white backdrop-blur-md flex justify-between items-center shadow-xl">
          <Button variant="ghost" size="sm" onClick={() => setPages([])} className="gap-2 text-slate-500 hover:text-blue-600 font-bold uppercase text-[10px] tracking-widest">
            <RefreshCcw className="w-4 h-4" /> Start New Command
          </Button>
          <div className="flex gap-3">
             <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-2 border-2 rounded-full px-6 font-bold text-[10px] uppercase tracking-widest">
              <Download className="w-4 h-4" /> Export Pitch Deck
            </Button>
            <span className="flex items-center gap-1.5 font-black text-[10px] uppercase tracking-widest text-blue-600 px-5 py-2 bg-blue-600/10 rounded-full border border-blue-600/20">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" /> Final Preview
            </span>
          </div>
        </div>

        <div className="pdf-preview-mode print:bg-white flex flex-col items-center pb-24">
          {pages.map((page, index) => (
            <PageWrapper key={page.id} theme={page.theme} pageNumber={index + 1}>
              {page.archetype === "Hero" && <HeroLayout page={page} />}
              {page.archetype === "Bento" && <BentoLayout page={page} />}
              {page.archetype === "Inquiry" && <InquiryLayout page={page} />}
              {page.archetype === "Visual Break" && <VisualBreakLayout page={page} />}
            </PageWrapper>
          ))}
        </div>
      </main>
    </div>
  );
import { jsPDF } from "jspdf";

const handleDownload = () => {
  // 1. Create the PDF document
  const doc = new jsPDF();
  
  pages.forEach((page, index) => {
    // 2. Add a new page for every item in your 'pages' array
    if (index > 0) doc.addPage();

    // 3. Design the Header (Obsidion Style)
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 30, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("EXECUTIVE INTELLIGENCE", 105, 20, { align: "center" });

    // 4. Add the Content (User's customized Title & Body)
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(22);
    doc.text(page.title.toUpperCase(), 20, 50);

    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    
    // This splits the text so it doesn't go off the side of the page
    const splitText = doc.splitTextToSize(page.body, 170);
    doc.text(splitText, 20, 70);

    // 5. Page Numbering
    doc.setFontSize(10);
    doc.text(`Page ${index + 1}`, 105, 285, { align: "center" });
  });

  // 6. Trigger the actual download in the friend's browser
  doc.save(`${topic.replace(/\s+/g, '_')}_Report.pdf`);
};