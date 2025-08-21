import { assistantsData } from '@/data/assistants'
import mongoose, { Schema, model } from 'mongoose'

// Auth.js Database models: https://authjs.dev/concepts/database-models
// At this stage, the models are automatically created by the auth provider

export interface UserDocument {
    name: string
    email: string
    image: string
    emailVerified: Date | null
    language: string | null
    phone: string | null
    gender: string | null
    status: string | null
    assistant: string | null
}

const UserSchema = new Schema<UserDocument>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is invalid'],
        },
        image: {
            type: String,
        },
        emailVerified: {
            type: Date,
        },
        language: {
            type: String,
            enum: ['en-US', 'he-IL', 'fr-FR', 'de-DE', 'es-ES',],
            default: 'en-US',
        },
        phone: {
            type: String,
            match: [/^\+?[1-9]\d{1,14}$/, 'Phone number is invalid'],
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other', 'prefer-not-to-say',''],
            // default: 'prefer-not-to-say',
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'banned'],
            default: 'active',
        },
        assistant: {
            type: String,
            enum: assistantsData.map((assistant) => assistant.name),
            default: assistantsData[0].name,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.models?.User || model<UserDocument>('User', UserSchema)
