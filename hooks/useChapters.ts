import useSWR from 'swr'
import { fetcher } from '@/helpers/fatcher'

function useChapters(bookId: string) {
    const url = `/api/chapters?bookId=${bookId}`
    const { data, error, isLoading, mutate } = useSWR(url, fetcher)

    return {
        chapters: data,
        isLoading,
        isError: error,
        mutate,
    }
}

export default useChapters
