"use client";

import { PageContent } from "@/lib/types";
import { LayoutGrid, Globe, Shield, CheckCircle2, Sparkles, Quote, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroLayout({ page }: { page: PageContent }) {
  // Saturation > 30% (Ocean, Sunset, Royal, Emerald) uses white text
  const isVibrant = page.theme !== 'Minimal' && page.theme !== 'Abyss';
  const textColor = isVibrant ? "text-white" : "text-[#3C4043]";
  const secondaryColor = isVibrant ? "text-white/80" : "text-[#3C4043]/70";

  return (
    <div className="flex-1 flex flex-col justify-center gap-12 relative min-h-0">
      <div className={cn(
        "space-y-6 flex flex-col flex-wrap",
        isVibrant ? "scrim-glass-dark" : "scrim-glass"
      )}>
        <div className={cn(
          "inline-flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-2 shadow-xl",
          isVibrant ? "bg-white/10 text-white border border-white/20" : "bg-[#4285F4] text-white"
        )}>
          <Zap className="w-3 h-3" /> Core Strategic Pillar
        </div>
        <h1 className={cn(
          "text-[68px] font-black font-headline leading-[0.9] tracking-tighter text-balance break-words",
          textColor
        )}>
          {page.title}
        </h1>
        {page.subtitle && (
          <p className={cn(
            "text-2xl font-semibold max-w-[90%] leading-tight opacity-90",
            secondaryColor
          )}>
            {page.subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-wrap">
        {page.metrics?.slice(0, 3).map((m, i) => (
          <div key={i} className={cn(
            "google-card-exec border-none",
            isVibrant ? "bg-white/10 text-white" : "bg-white shadow-xl text-[#3C4043]"
          )}>
            <p className={cn("text-[9px] font-black uppercase tracking-[0.3em] mb-3", isVibrant ? "text-white/60" : "text-[#4285F4]")}>
              {m.label}
            </p>
            <p className="text-4xl font-black font-headline tracking-tighter leading-none">{m.value}</p>
          </div>
        ))}
      </div>

      <div className={cn(
        "max-w-full leading-relaxed text-lg font-medium break-words",
        isVibrant ? "text-white/90" : "text-[#3C4043]/80"
      )}>
        {page.body}
      </div>
    </div>
  );
}

export function BentoLayout({ page }: { page: PageContent }) {
  const isVibrant = page.theme !== 'Minimal' && page.theme !== 'Abyss';
  const textColor = isVibrant ? "text-white" : "text-[#3C4043]";

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="mb-10 flex flex-col flex-wrap">
        <h1 className={cn(
          "text-[48px] font-black font-headline leading-[1.1] tracking-tighter mb-4",
          isVibrant ? "text-white" : "text-[#4285F4]"
        )}>
          {page.title}
        </h1>
        <p className={cn(
          "text-lg leading-relaxed max-w-2xl font-semibold",
          isVibrant ? "text-white/80" : "text-[#3C4043]/70"
        )}>
          {page.body}
        </p>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-6 flex-1 mb-8 flex-wrap">
        {page.bentoItems?.slice(0, 4).map((item, i) => (
          <div key={i} className={cn(
            "google-card-exec",
            isVibrant ? "bg-white/10 border-white/10 text-white" : "bg-white shadow-xl text-[#3C4043]"
          )}>
            <div className={cn(
              "mb-4 w-12 h-12 rounded-2xl flex items-center justify-center shadow-md",
              isVibrant ? "bg-white/10" : "bg-slate-50 border border-black/5"
            )}>
              {i % 4 === 0 ? <Globe className="w-6 h-6 text-[#4285F4]" /> : 
               i % 4 === 1 ? <Shield className="w-6 h-6 text-[#34A853]" /> : 
               i % 4 === 2 ? <TrendingUp className="w-6 h-6 text-[#EA4335]" /> : 
               <LayoutGrid className="w-6 h-6 text-[#FBBC04]" />}
            </div>
            <h3 className="text-xl font-black font-headline mb-2 tracking-tighter leading-tight">{item.title}</h3>
            <p className={cn("text-sm leading-snug font-medium flex-1", isVibrant ? "text-white/70" : "text-[#3C4043]/60")}>
              {item.body}
            </p>
          </div>
        ))}
      </div>

      {page.codeSnippet && (
        <div className="rounded-[32px] overflow-hidden shadow-2xl border border-black/5 min-h-[120px]">
          <div className="bg-[#3C4043] px-6 py-3 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EA4335]" />
              <div className="w-3 h-3 rounded-full bg-[#FBBC04]" />
              <div className="w-3 h-3 rounded-full bg-[#34A853]" />
            </div>
            <span className="text-[9px] text-white/50 font-black uppercase tracking-[0.2em]">Systems Node</span>
          </div>
          <pre className="p-8 bg-[#202124] font-code text-[12px] leading-relaxed text-[#4285F4] overflow-hidden whitespace-pre-wrap">
            {page.codeSnippet}
          </pre>
        </div>
      )}
    </div>
  );
}

export function InquiryLayout({ page }: { page: PageContent }) {
  const isVibrant = page.theme !== 'Minimal' && page.theme !== 'Abyss';
  const textColor = isVibrant ? "text-white" : "text-[#3C4043]";

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="mb-10 flex flex-col flex-wrap">
        <h1 className={cn(
          "text-[42px] font-black font-headline leading-tight tracking-tighter mb-4",
          isVibrant ? "text-white" : "text-[#3C4043]"
        )}>
          {page.title}
        </h1>
        <div className="flex gap-4 items-center">
          <div className="h-1.5 w-12 bg-[#4285F4] rounded-full" />
          <p className={cn("text-[9px] font-black uppercase tracking-[0.4em]", isVibrant ? "text-white/60" : "text-[#4285F4]")}>
            Technical Validation Protocol
          </p>
        </div>
      </div>

      <div className="space-y-6 flex-1 flex flex-col flex-wrap min-h-0">
        <div className="grid grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <label className={cn("text-[9px] font-black uppercase tracking-[0.2em] ml-4", isVibrant ? "text-white/60" : "text-[#3C4043]/40")}>
                Analytical Input {i + 1}
              </label>
              <div className={cn(
                "w-full h-16 rounded-full border-2 flex items-center px-8 text-sm italic font-semibold",
                isVibrant ? "bg-white/10 border-white/20 text-white/40" : "bg-slate-50 border-slate-200 text-slate-400"
              )}>
                Defining parameters...
              </div>
            </div>
          ))}
        </div>

        <div className={cn(
          "mt-6 google-card-exec flex-1 min-h-[250px]",
          isVibrant ? "bg-white/10 border-white/10 text-white" : "bg-white shadow-xl text-[#3C4043]"
        )}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#4285F4]/20 flex items-center justify-center">
               <TrendingUp className="w-6 h-6 text-[#4285F4]" />
            </div>
            <h3 className="text-2xl font-black font-headline tracking-tighter leading-none">Execution Roadmap</h3>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-6 flex-wrap">
            {page.checklist?.slice(0, 6).map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center shrink-0 shadow-md",
                  i % 2 === 0 ? "bg-[#4285F4] text-white" : "bg-[#34A853] text-white"
                )}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-base font-bold leading-snug break-words">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function VisualBreakLayout({ page }: { page: PageContent }) {
  const isVibrant = page.theme !== 'Minimal' && page.theme !== 'Abyss';
  const textColor = isVibrant ? "text-white" : "text-[#4285F4]";

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-10 relative min-h-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none opacity-5">
         <Quote className={cn("w-full h-full", isVibrant ? "text-white" : "text-[#4285F4]")} />
      </div>
      
      <div className={cn(
        "relative z-10 space-y-10 w-full flex flex-col items-center",
        isVibrant ? "scrim-glass-dark" : "scrim-glass"
      )}>
        <h1 className={cn(
          "text-[56px] font-black font-headline leading-[0.95] tracking-tighter break-words max-w-full",
          textColor
        )}>
          {page.title}
        </h1>
        <div className="flex gap-4 justify-center">
          <div className="w-3.5 h-3.5 rounded-full bg-[#4285F4]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#EA4335]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#FBBC04]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#34A853]" />
        </div>
        <p className={cn(
          "text-3xl font-bold leading-tight italic text-balance max-w-2xl break-words",
          isVibrant ? "text-white" : "text-[#3C4043]"
        )}>
          "{page.body}"
        </p>
      </div>
    </div>
  );
}