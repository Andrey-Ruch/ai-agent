'use client'

// React
import { useState } from 'react'

// Next
import Link from 'next/link'

// Components
import { Button } from '@/components/ui/button'
import { BookPlus, Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'

async function createBook() {
    const response = await fetch('/api/books', {
        method: 'POST',
    })

    if (!response.ok) {
        throw new Error('Failed to create book')
    }

    return response.json()
}

export default function Books({ books, mutate }: { books: any; mutate: () => void }) {
    const [isLoading, setIsLoading] = useState(false)

    async function handleNewBook() {
        try {
            setIsLoading(true)
            await createBook()
            toast.success('Book created successfully')
            mutate()
        } catch (error) {
            console.error('[components/Books.tsx] Error in handleNewBook()', error)
            toast.error('Failed to create book')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <p>
                Number of your books: <span className="font-bold">{books.length}</span>
            </p>

            <ul>
                {books.map((book: any, index: number) => (
                    <li key={book._id}>
                        {index + 1}.
                        <Button asChild variant="link">
                            <Link href={`/dashboard/books/${book._id}`}>{book.title}</Link>
                        </Button>
                    </li>
                ))}
            </ul>

            <Button
                className="mt-4 cursor-pointer"
                size="sm"
                onClick={handleNewBook}
                disabled={isLoading}>
                {isLoading ? <Loader2Icon className="animate-spin" /> : <BookPlus />} New book
            </Button>
        </div>
    )
}
