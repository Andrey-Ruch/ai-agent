import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth/auth'
import { getUserBooks } from '@/lib/database/queries/books'
import { Suspense } from 'react'
import Books from '@/components/Books'
import Loading from '@/components/Loading'
import { Book } from '@/lib/database/types/Book'

export default async function BooksPage() {
    const session = await auth()

    if (!session?.user) {
        redirect('/signin')
    }

    const books =  await getUserBooks(session.user.id as string)

    return (
        <Suspense fallback={<Loading />}>
            <Books books={books} />
        </Suspense>
    )
}
