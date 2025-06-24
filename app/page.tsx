import React, { Suspense } from 'react'
// import { TranscriptProvider } from '@/app/contexts/TranscriptContext'
// import App from './App'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {/* <TranscriptProvider>
                <App />
            </TranscriptProvider> */}
            <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
            </Button>
        </Suspense>
    )
}
