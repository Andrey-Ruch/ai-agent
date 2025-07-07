import { z } from 'zod'

// Define the allowed moderation categories only once
export const MODERATION_CATEGORIES = ['OFFENSIVE', 'OFF_BRAND', 'VIOLENCE', 'NONE'] as const

// Derive the union type for ModerationCategory from the array
export type ModerationCategory = (typeof MODERATION_CATEGORIES)[number]

// Create a Zod enum based on the same array
export const ModerationCategoryZod = z.enum([...MODERATION_CATEGORIES])

export type SessionStatus = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED'

export interface ConversationState {
    id: string
    description: string
    instructions: string[]
    examples: string[]
    transitions: {
        next_step: string
        condition: string
    }[]
}

export interface GuardrailResultType {
    status: 'IN_PROGRESS' | 'DONE'
    testText?: string
    category?: ModerationCategory
    rationale?: string
}

export interface TranscriptItem {
    itemId: string
    type: 'MESSAGE' | 'BREADCRUMB'
    role?: 'user' | 'assistant'
    title?: string
    data?: Record<string, any>
    expanded: boolean
    timestamp: string
    createdAtMs: number
    status: 'IN_PROGRESS' | 'DONE'
    isHidden: boolean
    guardrailResult?: GuardrailResultType
}

export interface LoggedEvent {
    id: number
    direction: 'client' | 'server'
    expanded: boolean
    timestamp: string
    eventName: string
    eventData: Record<string, any> // can have arbitrary objects logged
}

// Update the GuardrailOutputZod schema to use the shared ModerationCategoryZod
export const GuardrailOutputZod = z.object({
    moderationRationale: z.string(),
    moderationCategory: ModerationCategoryZod,
    testText: z.string().optional(),
})

export type GuardrailOutput = z.infer<typeof GuardrailOutputZod>
