'use server';

/**
 * @fileOverview An AI agent that generates a vibrant, 20-page document structure with Google Marketing aesthetics.
 *
 * - generateDocument - A function that handles the document creation process.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { v4 as uuidv4 } from 'uuid';

const GenerateDocumentInputSchema = z.object({
  topic: z.string().describe('The primary topic or subject of the document to be generated.'),
});
export type GenerateDocumentInput = z.infer<typeof GenerateDocumentInputSchema>;

const PageContentSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  body: z.string(),
  archetype: z.enum(['Hero', 'Bento', 'Inquiry', 'Visual Break']),
  theme: z.enum(['Ocean', 'Sunset', 'Royal', 'Emerald', 'Abyss', 'Minimal']),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  checklist: z.array(z.string()).optional(),
  codeSnippet: z.string().optional(),
  bentoItems: z.array(z.object({ title: z.string(), body: z.string() })).optional(),
});

const GenerateDocumentOutputSchema = z.object({
  title: z.string().describe('The overall title of the document.'),
  author: z.string().describe('An appropriate professional author name or organization.'),
  pages: z.array(PageContentSchema).describe('A comprehensive 20-page document structure.'),
});
export type GenerateDocumentOutput = z.infer<typeof GenerateDocumentOutputSchema>;

export async function generateDocument(input: GenerateDocumentInput): Promise<GenerateDocumentOutput> {
  return generateDocumentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDocumentPrompt',
  input: { schema: GenerateDocumentInputSchema },
  output: { schema: GenerateDocumentOutputSchema },
  prompt: `You are a world-class document architect specializing in "Google Marketing" aesthetics. 
Your goal is to create a massive, high-end, colorful 20-page PDF document about: "{{{topic}}}".

Content Guidelines:
- Use "Sentence case" for all headlines (e.g., "The future of energy" not "The Future of Energy").
- Provide deep, analytical content with professional terminology.
- Provide exactly 20 pages.

Visual Style System:
- Palette: Google Blue (#4285F4), Red (#EA4335), Yellow (#FBBC04), Green (#34A853).
- Theme Mapping:
  - Ocean: Blue to Green gradient (Trust/Growth)
  - Sunset: Red to Yellow gradient (Energy/Warmth)
  - Royal: Blue to Red gradient (Premium/Innovation)
  - Emerald: Green to Yellow gradient (Sustainability/Freshness)
  - Abyss: Dark Grey (Professional Deep Dives)
  - Minimal: Clean White with vibrant Google-colored accents.

Structure Strategy:
- Page 1: Hero (Cover) - Use Royal or Ocean.
- Pages 2-5: Bento (Foundations) - Alternate Minimal and colorful themes.
- Pages 6-10: Deep Dives (Mixed) - Use Abyss for complex sections.
- Pages 11-15: Frameworks (Inquiry) - Highly actionable Minimal themes.
- Pages 16-19: Case Studies (Bento) - Vibrant Sunset or Emerald.
- Page 20: Closing (Visual Break) - Royal or Ocean.

Topic: {{{topic}}}`,
});

const generateDocumentFlow = ai.defineFlow(
  {
    name: 'generateDocumentFlow',
    inputSchema: GenerateDocumentInputSchema,
    outputSchema: GenerateDocumentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) throw new Error('Failed to generate document content.');
    
    return {
      ...output,
      pages: output.pages.slice(0, 20).map(page => ({
        ...page,
        id: uuidv4(),
      })) as any,
    };
  }
);
