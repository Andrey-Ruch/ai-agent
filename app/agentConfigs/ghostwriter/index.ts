import { tool, RealtimeAgent } from '@openai/agents/realtime'
import { ghostwriterPrompt } from './ghostwriterPrompt'
import { z } from 'zod'


// TODO: You need to think of a way to return the content from a function.
// This way it returns as a block of text (\n has no effect) 
const generateChapterDraft = tool({
    name: 'generate_chapter_draft',
    description: 'Used when the ghostwriter is ready to submit a full draft of a chapter or scene.',
    parameters: z.object({
        chapter_title: z.string(),
        chapter_text: z.string(),
    }),
    execute: async ({ chapter_title, chapter_text }) => {
        return `Title: ${chapter_title}\n\n${chapter_text}`
    },
})

export const ghostwriterAgent = new RealtimeAgent({
    name: 'Ghostwriter',
    voice: 'alloy',
    instructions: ghostwriterPrompt,
    tools: [generateChapterDraft],
})

export const ghostwriterScenario = [ghostwriterAgent]

export default ghostwriterScenario
