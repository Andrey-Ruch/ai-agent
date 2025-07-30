'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Page() {
    return (
        <div className="flex flex-row gap-4 items-center justify-center h-screen">
            <Button variant="outline" className="bg-white" asChild>
                <Link href="/signin">Sign in</Link>
            </Button>
            <Button asChild>
                <Link href="/dashboard?agentConfig=ghostwriter">Dashboard</Link>
            </Button>
        </div>
    )
}
