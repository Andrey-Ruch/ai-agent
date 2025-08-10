import mongoose, { Schema, model } from 'mongoose'

export interface BookDocument {
    _id: mongoose.Types.ObjectId
    authorId: mongoose.Types.ObjectId
    title: string
    createdAt: Date
    updatedAt: Date
}

const BookSchema = new Schema<BookDocument>(
    {
        authorId: { type: Schema.Types.ObjectId, ref: 'User' },
        title: {
            type: String,
            required: [true, 'Title is required'],
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.models?.Book || model<BookDocument>('Book', BookSchema)
