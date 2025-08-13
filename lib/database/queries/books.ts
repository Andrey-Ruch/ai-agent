import connectDB from '@/lib/database/mongodb'
import Book from '@/lib/database/models/Book'

export async function getUserBooks(userId: string) {
    try {
        await connectDB()
        
        // Returns plain objects for fast serialization
        const docs = await Book.find({ authorId: userId }).lean()
        const books = docs.map((d: any) => ({
            id: d._id?.toString?.(),
            authorId: d.authorId?.toString?.(),
            title: d.title,
            createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : '',
            updatedAt: d.updatedAt ? new Date(d.updatedAt).toISOString() : '',
        }))

        return books
    } catch (error) {
        console.error('[lib/database/queries/books.ts] Error in getUserBooks()', error)
        throw error
    }
}
