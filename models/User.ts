import mongoose, { Schema, model } from 'mongoose'

// Auth.js Database models: https://authjs.dev/concepts/database-models
// At this stage, the models are automatically created by the auth provider

// TODO: Need to add a books array field to the user document
export interface UserDocument {
    _id: string
    email: string
    fullName: string
    firstName: string
    lastName: string
    imageUrl: string
    phone: string
    createdAt: Date
    updatedAt: Date
}

const UserSchema = new Schema<UserDocument>(
    {
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is invalid'],
        },
        fullName: {
            type: String,
            required: [true, 'Name is required'],
        },
        firstName: {
            type: String,
            required: [true, 'First name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
        },
        imageUrl: {
            type: String,
        },
        phone: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.models?.User || model<UserDocument>('User', UserSchema)
export default User
