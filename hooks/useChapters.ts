import useSWR from 'swr'
import { fetcher } from '@/helpers/fatcher'

function useChapters(bookId: string) {
    // Use null or pass a function as key to conditionally fetch data.
    // If the function throws or returns a falsy value, SWR will not start the request.
    // https://swr.vercel.app/docs/conditional-fetching
    const url = bookId ? `/api/books/${bookId}/chapters` : null

    const { data, error, isLoading, mutate } = useSWR(url, fetcher)

    return {
        chapters: data,
        isLoading,
        isError: error,
        mutate,
    }
}

export default useChapters
