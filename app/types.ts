import { z } from 'zod'

// Define the allowed moderation categories only once
export const MODERATION_CATEGORIES = ['OFFENSIVE', 'OFF_BRAND', 'VIOLENCE', 'NONE'] as const

// Derive the union type for ModerationCategory from the array
export type ModerationCategory = (typeof MODERATION_CATEGORIES)[number]

export type SessionStatus = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED'

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
