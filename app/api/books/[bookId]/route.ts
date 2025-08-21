import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/api/apiAuth'
import connectDB from '@/lib/database/mongodb'
import Book from '@/lib/database/models/Book'
import mongoose from 'mongoose'

// Get a single book by ID
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

        return NextResponse.json(book)
    } catch (error) {
        console.error('[api/books/[bookId]/route.ts] Error in GET request', error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}

// Update a single book by ID
export async function PUT(request: Request, { params }: { params: Promise<{ bookId: string }> }) {
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
        const { title } = body
        if (!title || typeof title !== 'string' || title.trim().length === 0) {
            return NextResponse.json(
                { message: 'Title is required and must be a non-empty string' },
                { status: 400 }
            )
        }

        await connectDB()

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

        // Update only allowed fields
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { title: title.trim() },
            { new: true, runValidators: true }
        )

        return NextResponse.json(updatedBook)
    } catch (error) {
        console.error('[api/books/[bookId]/route.ts] Error in PUT request', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}

// Delete a single book by ID
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ bookId: string }> }
) {
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

        await Book.findByIdAndDelete(bookId)

        return NextResponse.json({ message: 'Book deleted successfully' }, { status: 200 })
    } catch (error) {
        console.error('[api/books/[bookId]/route.ts] Error in DELETE request', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}
