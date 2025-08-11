import useSWR from 'swr'

function useBooks() {
    const fetcher = async (url: string) => {
        const response = await fetch(url)

        if (!response.ok) {
            const error = new Error(response.statusText)
            throw error
        }

        return response.json()
    }

    const { data, error, isLoading, mutate } = useSWR('/api/books', fetcher)

    return {
        books: data,
        isLoading,
        isError: error,
        mutate,
    }
}

export default useBooks
