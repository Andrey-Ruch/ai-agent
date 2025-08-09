'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-base font-medium">Something went wrong</h2>
            <p className="text-sm text-gray-500">Please contact the technical team</p>
            <Button
                className="mt-4 hover:cursor-pointer"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }>
                Try again
            </Button>
        </div>
    )
}
