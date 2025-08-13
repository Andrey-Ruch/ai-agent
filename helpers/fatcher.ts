export async function fetcher(url: string) {
    const response = await fetch(url)

    if (!response.ok) {
        const error = new Error(response.statusText)
        throw error
    }

    return response.json()
}
