import mongoose, { Schema, model } from 'mongoose'

export type Gender = 'male' | 'female' | 'other'
export type Role = 'admin' | 'user'

// TODO: Need to add a books array field to the user document
export interface UserDocument {
    _id: string
    email: string
    // password: string
    firstName: string
    lastName: string
    gender: Gender
    birthDate: Date
    phone: string
    imageUrl: string
    role: Role
    isActive: boolean
    isVerified: boolean
    isDeleted: boolean
    isBlocked: boolean
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
        // password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        gender: { type: String, required: true },
        birthDate: { type: Date, required: true },
        phone: { type: String, required: true },
        imageUrl: { type: String },
        role: { type: String, default: 'user' },
        isActive: { type: Boolean, default: true },
        isVerified: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
        isBlocked: { type: Boolean, default: false },
    },
    { timestamps: true }
)

const User = mongoose.models?.User || model<UserDocument>('User', UserSchema)

export default User
