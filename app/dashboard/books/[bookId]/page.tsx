'use client'

// React
import { use } from 'react'
import { useState } from 'react'

// Next
import Link from 'next/link'

// Hooks
import useChapters from '@/hooks/useChapters'

// Components
import Loading from '@/components/Loading'
import ErrorMessage from '@/components/ErrorMessage'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ListPlus, Loader2Icon } from 'lucide-react'

export default function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
    const { bookId } = use(params)

    // TODO: There is no need to fetch the entire chapter with all its fields (such as content, etc.)
    const { chapters, isLoading, isError, mutate } = useChapters(bookId)
    const [isLoadingNewChapter, setIsLoadingNewChapter] = useState(false)

    if (isLoading) return <Loading />
    if (isError) return <ErrorMessage message={isError.message} />

    async function handleNewChapter() {
        try {
            setIsLoadingNewChapter(true)
            const response = await fetch(`/api/books/${bookId}/chapters`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: 'New Chapter',
                    content: 'Start writing your chapter here...',
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to create chapter')
            }

            const newChapter = await response.json()
            console.log('New chapter created:', newChapter)

            // Refresh the chapters list
            mutate()

            toast.success('Chapter created successfully')
        } catch (error) {
            console.error('Error creating chapter:', error)
            toast.error('Failed to create chapter. Please try again.')
        } finally {
            setIsLoadingNewChapter(false)
        }
    }

    console.log('chapters', chapters)

    return (
        <div className="p-2">
            <h1 className="text-2xl font-bold mb-2">Book Page</h1>

            <p className="mb-2">Book ID: {bookId}</p>

            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Chapters</h2>
                <Button
                    className="cursor-pointer"
                    size="sm"
                    onClick={handleNewChapter}
                    disabled={isLoadingNewChapter}>
                    {isLoadingNewChapter ? <Loader2Icon className="animate-spin" /> : <ListPlus />}
                    New chapter
                </Button>
            </div>

            <ul>
                {chapters.map((chapter: any, index: number) => (
                    <li key={chapter._id}>
                        {index + 1}.
                        <Button asChild variant="link">
                            <Link href={`/dashboard/books/${bookId}/chapters/${chapter._id}`}>
                                {chapter.title}
                            </Link>
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
