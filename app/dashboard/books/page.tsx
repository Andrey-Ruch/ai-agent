'use client'

// Hooks
import useBooks from '@/hooks/useBooks'

// Components
import Loading from '@/components/Loading'
import ErrorMessage from '@/components/ErrorMessage'
import Books from '@/components/Books'

export default function BooksPage() {
    const { books, isLoading, isError, mutate } = useBooks()

    if (isLoading) return <Loading />
    if (isError) return <ErrorMessage message={isError.message} />

    return (
        <div className="flex flex-col gap-4 p-2">
            <h1>Books Page</h1>
            <Books books={books} mutate={mutate} />
        </div>
    )
}
