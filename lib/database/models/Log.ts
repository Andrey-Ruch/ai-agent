import mongoose from 'mongoose'

export interface LogDocument {
    _id: mongoose.Types.ObjectId
    logType: string
    userId: mongoose.Types.ObjectId
    message: string
}

const LogSchema = new mongoose.Schema(
    {
        logType: {
            type: String,
            enum: ['critical', 'error', 'info', 'debug'],
            default: 'info',
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        message: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
)

export default mongoose.models?.Log || mongoose.model<LogDocument>('Log', LogSchema)
