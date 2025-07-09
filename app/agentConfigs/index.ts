import { chatSupervisorScenario } from './chatSupervisor'
import { ghostwriterScenario } from './ghostwriter'

import type { RealtimeAgent } from '@openai/agents/realtime'

// Map of scenario key -> array of RealtimeAgent objects
export const allAgentSets: Record<string, RealtimeAgent[]> = {
    chatSupervisor: chatSupervisorScenario,
    ghostwriter: ghostwriterScenario,
}

export const defaultAgentSetKey = 'ghostwriter'
