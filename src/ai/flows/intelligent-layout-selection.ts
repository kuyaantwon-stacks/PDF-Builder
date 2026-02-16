'use server';

/**
 * @fileOverview An AI agent that selects the most appropriate layout archetype for a given page content.
 *
 * - selectLayoutArchetype - A function that selects the layout archetype.
 * - SelectLayoutArchetypeInput - The input type for the selectLayoutArchetype function.
 * - SelectLayoutArchetypeOutput - The return type for the selectLayoutArchetype function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SelectLayoutArchetypeInputSchema = z.object({
  pageContent: z
    .string()
    .describe('The content of the page for which a layout archetype needs to be selected.'),
});
export type SelectLayoutArchetypeInput = z.infer<typeof SelectLayoutArchetypeInputSchema>;

const SelectLayoutArchetypeOutputSchema = z.object({
  layoutArchetype: z
    .enum(['Hero', 'Bento', 'Inquiry', 'Visual Break'])
    .describe('The selected layout archetype for the page content.'),
});
export type SelectLayoutArchetypeOutput = z.infer<typeof SelectLayoutArchetypeOutputSchema>;

export async function selectLayoutArchetype(
  input: SelectLayoutArchetypeInput
): Promise<SelectLayoutArchetypeOutput> {
  return selectLayoutArchetypeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'selectLayoutArchetypePrompt',
  input: {schema: SelectLayoutArchetypeInputSchema},
  output: {schema: SelectLayoutArchetypeOutputSchema},
  prompt: `You are an expert in visual design and layout principles. Given the content of a page, you will determine the most appropriate layout archetype from the following options: Hero, Bento, Inquiry, Visual Break.

Consider the following when making your selection:

- Hero: Suitable for cover pages or openers with a full gradient background and metric boxes.
- Bento: Ideal for feature grids with a 2x2 or 2x3 card arrangement.
- Inquiry: Best for worksheets or forms with stacked fields and labels.
- Visual Break: Appropriate for quotes or impactful statements on a full dark blue background.

Content: {{{pageContent}}}

Based on the content provided, the most suitable layout archetype is:`,
});

const selectLayoutArchetypeFlow = ai.defineFlow(
  {
    name: 'selectLayoutArchetypeFlow',
    inputSchema: SelectLayoutArchetypeInputSchema,
    outputSchema: SelectLayoutArchetypeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
