'use client'

import * as React from 'react'
import Link from 'next/link'
import { LibraryBig, BookOpenText } from 'lucide-react'
import { Session } from 'next-auth'

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

// This is sample data
const data = {
    user: {
        name: 'User name',
        email: 'user@example.com',
        avatar: 'https://github.com/shadcn.png',
    },
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
    // TODO: The import of user information needs to be improved, the same data is also exported in NavBar.
    // A dedicated function should be considered.
    const user = {
        name: session?.user?.name || 'User',
        email: session?.user?.email || 'user@example.com',
        avatar: session?.user?.image || 'https://github.com/shadcn.png',
    }
    console.log('[AppSidebar] user', user)

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="text-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <img src="/logo.svg" alt="Agatha" className="size-6" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold text-primary text-base">
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
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
