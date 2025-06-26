import React, { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
            </Button>
        </Suspense>
    )
}
