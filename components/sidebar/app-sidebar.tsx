'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Session } from 'next-auth'
import { Book } from '@/lib/database/types/Book'
import useBooks from '@/hooks/useBooks'
import { useChapters } from '@/hooks/useChapters'

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

// This is sample data
const data = {
    navMain: [
        {
            name: 'Books',
            url: '/dashboard/books',
            icon: LibraryBig,
        },
    ],
    projects: [
        {
            title: 'Book Demo #1',
            url: '#',
            icon: BookOpenText,
            // isActive: true,
            items: [
                {
                    title: 'History',
                    url: '#',
                },
                {
                    title: 'Starred',
                    url: '#',
                },
                {
                    title: 'The End',
                    url: '#',
                },
            ],
        },
        {
            title: 'Book Demo #2',
            url: '#',
            icon: BookOpenText,
            items: [
                {
                    title: 'Genesis',
                    url: '#',
                },
                {
                    title: 'Explorer',
                    url: '#',
                },
                {
                    title: 'Quantum',
                    url: '#',
                },
            ],
        },
    ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    session: Session | null
}

export function AppSidebar({ session, ...props }: AppSidebarProps) {
    const { books = [], isLoading, isError } = useBooks()

    // TODO: This should be done in NavProjects
    // Transform books data for NavProjects
    const projects = books.map((book: Book) => ({
        title: book.title,
        id: book._id,
        icon: BookOpenText,
        isActive: false,
        items: [
            {
                title: 'Chapter 1',
                url: '#',
            },
            {
                title: 'Chapter 2',
                url: '#',
            },
            {
                title: 'Chapter 3',
                url: '#',
            },
        ],
    }))

    // TODO: The import of user information needs to be improved, the same data is also exported in NavBar.
    // A dedicated function should be considered.
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
