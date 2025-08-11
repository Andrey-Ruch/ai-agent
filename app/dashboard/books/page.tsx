'use client'

import Loading from '@/components/Loading'
import ErrorMessage from '@/components/ErrorMessage'
import Books from '@/components/Books'
import useBooks from '@/hooks/useBooks'

export default function BooksPage() {
    const { books, isLoading, isError, mutate } = useBooks()

    if (isLoading) return <Loading />
    if (isError) return <ErrorMessage message={isError.message} />

    return <Books books={books} mutate={mutate} />
}
