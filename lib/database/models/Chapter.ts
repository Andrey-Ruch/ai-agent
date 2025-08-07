import mongoose, { Schema, model } from 'mongoose'

export interface ChapterDocument {
    bookId: mongoose.Types.ObjectId
    title: string
    content: string
}

const ChapterSchema = new Schema<ChapterDocument>(
    {
        bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
        title: {
            type: String,
            required: [true, 'Chapter title is required'],
        },
        content: {
            type: String,
            required: [true, 'Chapter content is required'],
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.models?.Chapter || model<ChapterDocument>('Chapter', ChapterSchema)
