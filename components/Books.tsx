import { Button } from '@/components/ui/button'
import { BookPlus } from 'lucide-react'

export default function Books({ books, onCreateBook }: { books: any[]; onCreateBook: () => void }) {
    return (
        <div className="p-1">
            <p>Number of your books: <span className="font-bold">{books.length}</span></p>
            
            <Button className="mt-2 cursor-pointer" size="sm" onClick={onCreateBook}>
                <BookPlus /> Create Book
            </Button>
        </div>
    )
}
