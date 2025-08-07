import mongoose, { Schema, model } from 'mongoose'

// Auth.js Database models: https://authjs.dev/concepts/database-models
// At this stage, the models are automatically created by the auth provider

export interface UserDocument {
    name: string
    email: string
    image: string
    emailVerified: Date | null
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
    },
    {
        timestamps: true,
    }
)

export default mongoose.models?.User || model<UserDocument>('User', UserSchema)
