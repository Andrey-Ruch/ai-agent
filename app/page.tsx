import Link from 'next/link'
import { auth } from '@/lib/auth/auth'

// Components
import NavBar from '@/components/navbar/NavBar'
import { Button } from '@/components/ui/button'

export default async function Page() {
    const session = await auth()
    console.log('[Root layout page] session', session)

    return (
        <div className="container mx-auto px-4">
            <NavBar session={session} />
            <div className="flex flex-col items-center justify-center">
                <h1 className="mb-4 font-semibold">Home Page</h1>
                <Button asChild>
                    <Link href="/dashboard?agentConfig=ghostwriter">Start Writing</Link>
                </Button>
            </div>
        </div>
    )
}
