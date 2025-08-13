'use client'

// React
import { use } from 'react'

// Hooks
import useChapters from '@/hooks/useChapters'

export default function ChapterPage({ params }: { params: Promise<{ bookId: string; chapterId: string }> }) {
    const { bookId, chapterId } = use(params)

    console.log('bookId', bookId)
    console.log('chapterId', chapterId)

    return (
        <div className="p-2">
            <h1>ChapterPage</h1>
        </div>
    )
}
