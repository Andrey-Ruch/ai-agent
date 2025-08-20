import useSWR from 'swr'
import { fetcher } from '@/helpers/fatcher'
import { useCallback } from 'react'

function useChapter(bookId: string, chapterId: string) {
    // Use null to conditionally fetch data only when both IDs are available
    const url = bookId && chapterId ? `/api/books/${bookId}/chapters/${chapterId}` : null
    const { data, error, isLoading, mutate } = useSWR(url, fetcher)

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
                mutate(updatedChapter, false) // Update cache
                return updatedChapter
            } catch (error) {
                console.error('Save chapter failed:', error)
                throw error
            }
        },
        [url, mutate]
    )

    return {
        chapter: data,
        isLoading,
        isError: error,
        mutate,
        updateChapter,
    }
}

export default useChapter
