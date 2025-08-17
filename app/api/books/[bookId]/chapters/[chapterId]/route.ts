import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/api/apiAuth'
import connectDB from '@/lib/database/mongodb'
import Chapter from '@/lib/database/models/Chapter'
import Book from '@/lib/database/models/Book'
import mongoose from 'mongoose'

// Get a specific chapter
export async function GET({ params }: { params: { bookId: string; chapterId: string } }) {
    const authResult = await requireAuth()

    if (!authResult.isAuthenticated) {
        return authResult.response
    }

    try {
        const { bookId, chapterId } = await params

        // Validate ObjectId formats
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return NextResponse.json({ message: 'Invalid book ID format' }, { status: 400 })
        }
        if (!mongoose.Types.ObjectId.isValid(chapterId)) {
            return NextResponse.json({ message: 'Invalid chapter ID format' }, { status: 400 })
        }

        await connectDB()

        // Verify the book exists and user owns it
        const book = await Book.findById(bookId)
        if (!book) {
            return NextResponse.json({ message: 'Book not found' }, { status: 404 })
        }
        if (book.authorId.toString() !== authResult.session?.user?.id) {
            return NextResponse.json(
                { message: 'Forbidden: You do not own this book' },
                { status: 403 }
            )
        }

        // Find the specific chapter
        const chapter = await Chapter.findOne({ _id: chapterId, bookId })
        if (!chapter) {
            return NextResponse.json({ message: 'Chapter not found' }, { status: 404 })
        }

        return NextResponse.json(chapter)
    } catch (error) {
        console.error(
            '[api/books/[bookId]/chapters/[chapterId]/route.ts] Error in GET request',
            error
        )
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}

// Update a specific chapter
export async function PUT(
    request: Request,
    { params }: { params: { bookId: string; chapterId: string } }
) {
    const authResult = await requireAuth()

    if (!authResult.isAuthenticated) {
        return authResult.response
    }

    try {
        const { bookId, chapterId } = await params
        const body = await request.json()

        // Validate ObjectId formats
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return NextResponse.json({ message: 'Invalid book ID format' }, { status: 400 })
        }
        if (!mongoose.Types.ObjectId.isValid(chapterId)) {
            return NextResponse.json({ message: 'Invalid chapter ID format' }, { status: 400 })
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

        // Verify the book exists and user owns it
        const book = await Book.findById(bookId)

        // Check if the book exists
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

        // Update the chapter
        const updateData: any = {}
        if (title) updateData.title = title
        if (content) updateData.content = content

        const updatedChapter = await Chapter.findOneAndUpdate(
            { _id: chapterId, bookId },
            updateData,
            { new: true, runValidators: true }
        )

        if (!updatedChapter) {
            return NextResponse.json({ message: 'Chapter not found' }, { status: 404 })
        }

        return NextResponse.json(updatedChapter)
    } catch (error) {
        console.error(
            '[api/books/[bookId]/chapters/[chapterId]/route.ts] Error in PUT request',
            error
        )
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}

// Delete a specific chapter
export async function DELETE(
    request: Request,
    { params }: { params: { bookId: string; chapterId: string } }
) {
    const authResult = await requireAuth()

    if (!authResult.isAuthenticated) {
        return authResult.response
    }

    try {
        const { bookId, chapterId } = await params

        // Validate ObjectId formats
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return NextResponse.json({ message: 'Invalid book ID format' }, { status: 400 })
        }
        if (!mongoose.Types.ObjectId.isValid(chapterId)) {
            return NextResponse.json({ message: 'Invalid chapter ID format' }, { status: 400 })
        }

        await connectDB()

        // Verify the book exists and user owns it
        const book = await Book.findById(bookId)
        if (!book) {
            return NextResponse.json({ message: 'Book not found' }, { status: 404 })
        }
        if (book.authorId.toString() !== authResult.session?.user?.id) {
            return NextResponse.json(
                { message: 'Forbidden: You do not own this book' },
                { status: 403 }
            )
        }

        // Delete the chapter
        const deletedChapter = await Chapter.findOneAndDelete({ _id: chapterId, bookId })
        if (!deletedChapter) {
            return NextResponse.json({ message: 'Chapter not found' }, { status: 404 })
        }

        return NextResponse.json({
            message: 'Chapter deleted successfully',
            chapter: deletedChapter,
        })
    } catch (error) {
        console.error(
            '[api/books/[bookId]/chapters/[chapterId]/route.ts] Error in DELETE request',
            error
        )
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}
