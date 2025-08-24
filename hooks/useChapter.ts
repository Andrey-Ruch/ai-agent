import useSWR, { mutate } from 'swr'
import { fetcher } from '@/helpers/fatcher'
import { useCallback } from 'react'

function useChapter(bookId: string, chapterId: string) {
    // Use null to conditionally fetch data only when both IDs are available
    const url = bookId && chapterId ? `/api/books/${bookId}/chapters/${chapterId}` : null
    const { data, error, isLoading, mutate: mutateChapter } = useSWR(url, fetcher)

    const updateChapter = useCallback(
        async (updates: { title?: string; content?: string }) => {
            if (!url) return

            try {
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updates),
                })

                if (!response.ok) throw new Error('Failed to update chapter')

                const updatedChapter = await response.json()

                // Update the single chapter cache
                mutateChapter(updatedChapter, false)

                // Also update the chapters list cache used by sidebar
                const chaptersUrl = `/api/books/${bookId}/chapters`
                mutate(
                    chaptersUrl,
                    (currentChapters: any[] | undefined) => {
                        if (!currentChapters) return currentChapters

                        return currentChapters.map((chapter) =>
                            chapter._id === chapterId ? { ...chapter, ...updates } : chapter
                        )
                    },
                    false
                )

                return updatedChapter
            } catch (error) {
                console.error('Save chapter failed:', error)
                throw error
            }
        },
        [url, mutateChapter, bookId, chapterId]
    )

    return {
        chapter: data,
        isLoading,
        isError: error,
        mutate: mutateChapter,
        updateChapter,
    }
}

export default useChapter
