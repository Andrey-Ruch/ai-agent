'use client'

// React
import { use } from 'react'
import { useState } from 'react'

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
    const { chapters, isLoading, isError, mutate } = useChapters(bookId)
    const [isLoadingNewChapter, setIsLoadingNewChapter] = useState(false)

    if (isLoading) return <Loading />
    if (isError) return <ErrorMessage message={isError.message} />

    async function handleNewChapter() {
        try {
            setIsLoadingNewChapter(true)
            const response = await fetch('/api/chapters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookId,
                    title: 'New Chapter',
                    content: 'Start writing your chapter here...',
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to create chapter')
            }

            toast.success('Chapter created successfully')

            const newChapter = await response.json()
            console.log('New chapter created:', newChapter)

            // Refresh the chapters list
            mutate()
        } catch (error) {
            console.error('Error creating chapter:', error)
            toast.error('Failed to create chapter. Please try again.')
        } finally {
            setIsLoadingNewChapter(false)
        }
    }

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
                        {index + 1}. {chapter.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}
