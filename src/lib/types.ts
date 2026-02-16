export type LayoutArchetype = 'Hero' | 'Bento' | 'Inquiry' | 'Visual Break';
export type PageTheme = 'Ocean' | 'Sunset' | 'Royal' | 'Emerald' | 'Abyss' | 'Minimal';

export interface PageContent {
  id: string;
  title: string;
  subtitle?: string;
  body: string;
  archetype: LayoutArchetype;
  theme: PageTheme;
  metrics?: { label: string; value: string }[];
  checklist?: string[];
  codeSnippet?: string;
  bentoItems?: { title: string; body: string; icon?: string }[];
}

export interface Document {
  title: string;
  author: string;
  pages: PageContent[];
}