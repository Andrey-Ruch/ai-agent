import Link from 'next/link'
import { auth, signOut } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function Page() {
    const session = await auth()

    console.log('[Root layout page] session', session)

    const user = session?.user
    const isUserSignedIn = !!user
    const imageUrl = user?.image || ''
    const fullName = user?.name || ''
    const email = user?.email || ''

    return (
        <div className="flex flex-row gap-4 items-center justify-center h-screen">
            <Button asChild>
                <Link href="/dashboard?agentConfig=ghostwriter">Start Writing</Link>
            </Button>

            {isUserSignedIn ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex flex-row gap-2 items-center border border-gray-200 rounded-lg p-2 bg-white hover:bg-gray-50 hover:cursor-pointer">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={imageUrl} alt={fullName} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{fullName}</span>
                                <span className="truncate text-xs">{email}</span>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem>
                            <form
                                action={async (formData) => {
                                    'use server'
                                    await signOut()
                                }}
                                className="w-full">
                                <button type="submit" className="w-full hover:cursor-pointer">
                                    Sign out
                                </button>
                            </form>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button variant="outline" className="bg-white" asChild>
                    <Link href="/signin">Sign in</Link>
                </Button>
            )}
        </div>
    )
}
