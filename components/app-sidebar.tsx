'use client'

import * as React from 'react'
import Link from 'next/link'
import { Feather, LibraryBig, BookOpenText } from 'lucide-react'

import { NavProjects } from '@/components/nav-projects'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
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

// This is sample data.
const data = {
    user: {
        name: 'Andrey',
        email: 'andrey@example.com',
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="text-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Feather className="size-5" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-bold text-foreground text-base">
                                        Agatha
                                    </span>
                                    {/* <span className="">v1.0.0</span> */}
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
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
