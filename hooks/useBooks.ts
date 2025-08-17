import useSWR from 'swr'
import { fetcher } from '@/helpers/fatcher'

const URL = '/api/books'

function useBooks() {
    const { data, error, isLoading, mutate } = useSWR(URL, fetcher)

    return {
        books: data,
        isLoading,
        isError: error,
        mutate,
    }
}

export default useBooks
