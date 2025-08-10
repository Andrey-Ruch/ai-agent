'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
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

export default function Books({ books }: { books: any }) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleCreateBook() {
        try {
            setIsLoading(true)
            await createBook()
            toast.success('Book created successfully')
            router.refresh()
        } catch (error) {
            console.error('[components/Books.tsx] Error in handleCreateBook()', error)
            toast.error('Failed to create book')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="p-1">
            <p>
                Number of your books: <span className="font-bold">{books.length}</span>
            </p>

            <Button
                className="mt-2 cursor-pointer"
                size="sm"
                onClick={handleCreateBook}
                disabled={isLoading}>
                {isLoading ? <Loader2Icon className="animate-spin" /> : <BookPlus />} New book
            </Button>
        </div>
    )
}
