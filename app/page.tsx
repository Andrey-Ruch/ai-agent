import React, { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex flex-col items-center justify-center h-screen">
                <Button asChild>
                    <Link href="/dashboard?agentConfig=ghostwriter">Dashboard</Link>
                </Button>
            </div>
        </Suspense>
    )
}
