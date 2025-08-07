import mongoose, { Schema, model } from 'mongoose'

export interface BookDocument {
    authorId: mongoose.Types.ObjectId
    title: string
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
