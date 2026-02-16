"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { PageTheme } from "@/lib/types";

interface PageWrapperProps {
  children: ReactNode;
  theme: PageTheme;
  pageNumber?: number;
}

export default function PageWrapper({ children, theme, pageNumber }: PageWrapperProps) {
  const themeClass = {
    'Ocean': 'theme-ocean',
    'Sunset': 'theme-sunset',
    'Royal': 'theme-royal',
    'Emerald': 'theme-emerald',
    'Abyss': 'theme-abyss',
    'Minimal': 'theme-minimal'
  }[theme];

  // Dynamic Contrast Protocol: Saturation > 30% gets white text
  const isVibrant = theme !== 'Minimal' && theme !== 'Abyss';
  const textColor = isVibrant ? "text-white" : "text-[#3C4043]";

  return (
    <div className={cn(
      "pdf-page mx-auto overflow-hidden flex flex-col transition-all duration-300 shadow-2xl",
      themeClass
    )}>
      {/* Dynamic Accents: Organic overlapping circular blobs at 15% opacity */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#4285F4] rounded-full blur-[140px] opacity-[0.15] mix-blend-screen pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#34A853] rounded-full blur-[140px] opacity-[0.15] mix-blend-screen pointer-events-none" />
      
      {isVibrant && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FBBC04] rounded-full blur-[160px] opacity-[0.1] mix-blend-screen pointer-events-none" />
      )}

      {/* Visual Identity Header - Google Executive Style */}
      <div className={cn(
        "flex justify-between items-center mb-10 no-print relative z-30 px-6 py-3 rounded-full",
        isVibrant ? "bg-black/10 text-white/80" : "bg-black/5 text-[#3C4043]/60"
      )}>
        <span className="text-[9px] font-black uppercase tracking-[0.5em] font-headline">
          Global Strategy / Enterprise 2025
        </span>
        <div className="flex gap-2">
           <div className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
           <div className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
           <div className="w-2.5 h-2.5 rounded-full bg-[#FBBC04]" />
           <div className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
        </div>
      </div>

      {/* Main Content Area - Layout Safety: flexible container */}
      <div className="flex-1 relative z-20 flex flex-col min-h-0 w-full overflow-hidden">
        {children}
      </div>

      {/* Page Footer */}
      <div className={cn(
        "mt-auto pt-8 flex justify-between items-center relative z-30 border-t",
        isVibrant ? "border-white/10 text-white/70" : "border-black/10 text-[#3C4043]/50"
      )}>
        <div className="text-[9px] font-black uppercase tracking-[0.4em] font-headline">
          Confidential Strategic Publication • Pitch Deck v5
        </div>
        <div className={cn(
          "px-8 py-2 rounded-full text-xs font-black font-headline shadow-lg",
          isVibrant ? "bg-white/10 text-white border border-white/20" : "bg-[#4285F4] text-white"
        )}>
          PAGE {pageNumber ? pageNumber.toString().padStart(2, '0') : '--'}
        </div>
      </div>
    </div>
  );
}