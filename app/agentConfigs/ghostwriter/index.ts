import { tool, RealtimeAgent } from '@openai/agents/realtime'
import { ghostwriterPrompt } from './ghostwriterPrompt'
import { z } from 'zod'

const generateChapterDraft = tool({
    name: 'generate_chapter_draft',
    description: 'Used when the ghostwriter is ready to submit a full draft of a chapter or scene.',
    parameters: z.object({
        chapter_title: z.string(),
        chapter_text: z.string(),
    }),
    execute: async ({ chapter_title, chapter_text }) => {
        return {
            title: chapter_title,
            text: chapter_text,
        }
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
