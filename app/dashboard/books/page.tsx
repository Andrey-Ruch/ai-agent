'use client'

import useSWR from 'swr'
import Books from '@/components/Books'
import Loading from '@/components/Loading'
import ErrorMessage from '@/components/ErrorMessage'

const fetcher = async (url: string) => {
    const response = await fetch(url)

    if (!response.ok) {
        const error = new Error(response.statusText)
        throw error
    }

    return response.json()
}

export default function BooksPage() {
    const { data, error, isLoading, mutate } = useSWR('/api/books', fetcher)

    const handleCreateBook = async () => {
        try {
            const response = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                // Refresh the data after successful creation
                mutate()
            } else {
                console.error('Failed to create book')
            }
        } catch (error) {
            console.error('Error creating book:', error)
        }
    }

    if (isLoading) return <Loading />
    if (error) return <ErrorMessage message={error.message} />

    return <Books books={data} onCreateBook={handleCreateBook} />
}
