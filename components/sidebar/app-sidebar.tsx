'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Session } from 'next-auth'
import { Book } from '@/lib/database/types/Book'
import useBooks from '@/hooks/useBooks'
// import { useChapters } from '@/hooks/useChapters'

// Components
import { NavProjects } from '@/components/sidebar/nav-projects'
import { NavMain } from '@/components/sidebar/nav-main'
import { NavUser } from '@/components/sidebar/nav-user'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from '@/components/ui/sidebar'
import { LibraryBig, BookOpenText } from 'lucide-react'

const data = {
    navMain: [
        {
            name: 'Books',
            url: '/dashboard/books',
            icon: LibraryBig,
        },
    ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    session: Session | null
}

export function AppSidebar({ session, ...props }: AppSidebarProps) {
    const { books = [], isLoading, isError } = useBooks()
    const pathname = usePathname()

    const pathSegments = pathname.split('/')
    const currentBookId = pathSegments.includes('books')
        ? pathSegments[pathSegments.indexOf('books') + 1]
        : null
    const currentChapterId = pathSegments.includes('chapters')
        ? pathSegments[pathSegments.indexOf('chapters') + 1]
        : null

    // Transform books data for NavProjects
    const projects = books.map((book: Book) => ({
        title: book.title,
        id: book._id,
        icon: BookOpenText,
        isActive: currentBookId === book._id,
        activeChapterId: currentBookId === book._id ? currentChapterId : null,
    }))

    const user = {
        name: session?.user?.name || '',
        email: session?.user?.email || '',
        avatar: session?.user?.image || '',
    }

    return (
        // Sidebar documentation with structure diagram: https://ui.shadcn.com/docs/components/sidebar
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="text-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Image
                                        src="/square-logo.svg"
                                        alt="Agatha"
                                        className="size-6"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold text-primary text-lg">
                                        Agatha
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={projects} isLoading={isLoading} isError={isError} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
