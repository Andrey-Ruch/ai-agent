import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/api/apiAuth'
import connectDB from '@/lib/database/mongodb'
import Chapter from '@/lib/database/models/Chapter'
import Book from '@/lib/database/models/Book'
import mongoose from 'mongoose'

// Get all chapters for a specific book
export async function GET(request: Request, { params }: { params: Promise<{ bookId: string }> }) {
    const authResult = await requireAuth()

    if (!authResult.isAuthenticated) {
        return authResult.response
    }

    try {
        const { bookId } = await params

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return NextResponse.json({ message: 'Invalid book ID format' }, { status: 400 })
        }

        await connectDB()

        // First verify the book exists and user owns it
        const book = await Book.findById(bookId)
        if (!book) {
            return NextResponse.json({ message: 'Book not found' }, { status: 404 })
        }
        // Check if the user owns this book
        if (book.authorId.toString() !== authResult.session?.user?.id) {
            return NextResponse.json(
                { message: 'Forbidden: You do not own this book' },
                { status: 403 }
            )
        }

        const chapters = await Chapter.find({ bookId }).select('-content').sort({ createdAt: 1 })

        return NextResponse.json(chapters)
    } catch (error) {
        console.error('[api/books/[bookId]/chapters/route.ts] Error in GET request', error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}

// Create a new chapter for a specific book
export async function POST(request: Request, { params }: { params: Promise<{ bookId: string }> }) {
    const authResult = await requireAuth()

    if (!authResult.isAuthenticated) {
        return authResult.response
    }

    try {
        const { bookId } = await params
        const body = await request.json()

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return NextResponse.json({ message: 'Invalid book ID format' }, { status: 400 })
        }

        // Validate request body
        const { title, content } = body
        if (!title && !content) {
            return NextResponse.json(
                { message: 'At least one field (title or content) is required' },
                { status: 400 }
            )
        }

        await connectDB()

        // First verify the book exists and user owns it
        const book = await Book.findById(bookId)
        if (!book) {
            return NextResponse.json({ message: 'Book not found' }, { status: 404 })
        }

        // Check if the user owns this book
        if (book.authorId.toString() !== authResult.session?.user?.id) {
            return NextResponse.json(
                { message: 'Forbidden: You do not own this book' },
                { status: 403 }
            )
        }

        const newChapter = {
            bookId: new mongoose.Types.ObjectId(bookId),
            title: title.trim(),
            content: content,
        }

        const chapter = new Chapter(newChapter)
        const savedChapter = await chapter.save()

        return NextResponse.json(savedChapter, { status: 201 })
    } catch (error) {
        console.error('[api/books/[bookId]/chapters/route.ts] Error in POST request', error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}
