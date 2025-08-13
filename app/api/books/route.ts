import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/apiAuth'
import connectDB from '@/lib/database/mongodb'
import Book from '@/lib/database/models/Book'

// Get all books for the current user
export async function GET() {
    const authResult = await requireAuth()

    if (!authResult.isAuthenticated) {
        return authResult.response
    }

    try {
        await connectDB()
        const books = await Book.find({ authorId: authResult?.session?.user?.id })

        return NextResponse.json(books)
    } catch (error) {
        console.error('[api/books/route.ts] Error in GET request', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}

// Create a new book for the current user
export async function POST() {
    const authResult = await requireAuth()

    if (!authResult.isAuthenticated) {
        return authResult.response
    }

    try {
        // const body = await request.json()
        await connectDB()

        const newBook = {
            authorId: authResult?.session?.user?.id,
            title: 'New Book',
        }
        const book = new Book(newBook)
        const savedBook = await book.save()

        return NextResponse.json(savedBook)
    } catch (error) {
        console.error('[api/books/route.ts] Error in POST request', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}
