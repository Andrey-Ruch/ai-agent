import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/apiAuth'
import connectDB from '@/lib/database/mongodb'
import Chapter from '@/lib/database/models/Chapter'

// Get all chapters for a book
export async function GET(request: Request) {
    const authResult = await requireAuth()

    if (!authResult.isAuthenticated) {
        return authResult.response
    }

    try {
        await connectDB()

        // Get bookId from query parameters
        const { searchParams } = new URL(request.url)
        const bookId = searchParams.get('bookId')

        if (!bookId) {
            return NextResponse.json({ message: 'Book ID is required' }, { status: 400 })
        }

        // Fetch chapters for the book excluding content field to reduce response size
        const chapters = await Chapter.find({ bookId }).select('-content')

        return NextResponse.json(chapters)
    } catch (error) {
        console.error('[api/books/route.ts] Error in GET request', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}

// Create a new chapter for a given id book
export async function POST(request: Request) {
    const authResult = await requireAuth()

    if (!authResult.isAuthenticated) {
        return authResult.response
    }

    try {
        const body = await request.json()
        const {
            bookId,
            title = 'New Chapter',
            content = 'Start writing your chapter here...',
        } = body

        if (!bookId) {
            return NextResponse.json({ message: 'Book ID is required' }, { status: 400 })
        }

        await connectDB()

        const newChapter = {
            bookId,
            title,
            content,
        }
        const chapter = new Chapter(newChapter)
        const savedChapter = await chapter.save()

        return NextResponse.json(savedChapter)
    } catch (error) {
        console.error('[api/chapters/route.ts] Error in POST request', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}
