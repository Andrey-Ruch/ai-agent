import React, { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Loading from '@/components/Loading'

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Suspense fallback={<Loading />}>
                <Button asChild>
                    <Link href="/dashboard?agentConfig=ghostwriter">Dashboard</Link>
                </Button>
            </Suspense>
        </div>
    )
}
