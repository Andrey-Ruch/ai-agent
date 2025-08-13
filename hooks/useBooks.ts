import useSWR from 'swr'
import { fetcher } from '@/helpers/fatcher'

function useBooks() {
    const { data, error, isLoading, mutate } = useSWR('/api/books', fetcher)

    return {
        books: data,
        isLoading,
        isError: error,
        mutate,
    }
}

export default useBooks
