import { tool, RealtimeAgent } from '@openai/agents-realtime'
import { ghostwriterPrompt } from './ghostwriterPrompt'
// import { z } from 'zod'

export const agent = new RealtimeAgent({
    name: 'Ghostwriter',
    voice: 'alloy',
    instructions: ghostwriterPrompt,
    tools: [],
})
