'use client'

import { Button } from '@/components/ui/button'
import { BookPlus } from 'lucide-react'

export default function Books({ books }: { books: any[] }) {
    return (
        <div className="p-1">
            <p>
                Number of your books: <span className="font-bold">{books.length}</span>
            </p>

            <Button className="mt-2 cursor-pointer" size="sm" onClick={() => {}}>
                <BookPlus /> New book
            </Button>
        </div>
    )
}
