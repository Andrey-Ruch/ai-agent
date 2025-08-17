export async function fetcher(url: string, options?: RequestInit) {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    })

    if (!response.ok) {
        const error = new Error(response.statusText)
        throw error
    }

    return response.json()
}
