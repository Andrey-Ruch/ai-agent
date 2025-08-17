'use client'

import Link from 'next/link'
import { useState } from 'react'
import useChapters from '@/hooks/useChapters'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { ChevronRight, type LucideIcon } from 'lucide-react'

function BookCollapsible({
    book,
    index,
}: {
    book: {
        title: string
        id: string
        icon?: LucideIcon
        isActive?: boolean
    }
    index: number
}) {
    const [isOpen, setIsOpen] = useState(false)
    // console.log('\nbook\n', book)
    const { chapters = [], isLoading, isError } = useChapters(isOpen ? book.id : '')

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
    }

    return (
        <Collapsible
            key={index}
            asChild
            defaultOpen={book.isActive}
            onOpenChange={handleOpenChange}
            className="group/collapsible">
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={book.title} className="hover:cursor-pointer">
                        {book.icon && <book.icon className="size-6" />}
                        <span>{book.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {isLoading ? (
                            <SidebarMenuSubItem>
                                <div className="px-2 py-1 text-sm text-muted-foreground">
                                    Loading chapters...
                                </div>
                            </SidebarMenuSubItem>
                        ) : isError ? (
                            <SidebarMenuSubItem>
                                <div className="px-2 py-1 text-sm text-red-600">
                                    Error loading chapters
                                </div>
                            </SidebarMenuSubItem>
                        ) : chapters.length === 0 ? (
                            <SidebarMenuSubItem>
                                <div className="px-2 py-1 text-sm text-muted-foreground">
                                    No chapters yet
                                </div>
                            </SidebarMenuSubItem>
                        ) : (
                            chapters.map((chapter: any) => (
                                <SidebarMenuSubItem key={chapter._id}>
                                    <SidebarMenuSubButton asChild>
                                        <Link
                                            href={`/dashboard/books/${book.id}/chapters/${chapter._id}`}>
                                            <span>{chapter.title}</span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            ))
                        )}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    )
}

export function NavProjects({
    projects,
    isLoading,
    isError,
}: {
    projects: {
        title: string
        id: string
        icon?: LucideIcon
        isActive?: boolean
    }[]
    isLoading: boolean
    isError: boolean
}) {
    if (isError) return <div className="px-4 text-red-600 text-sm">Error loading books</div>

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            {isLoading ? (
                <div className="p-2 text-sm">Loading...</div>
            ) : (
                <SidebarMenu>
                    {projects.map((item, index) => (
                        // <Collapsible
                        //     key={index}
                        //     asChild
                        //     defaultOpen={item.isActive}
                        //     className="group/collapsible">
                        //     <SidebarMenuItem>
                        //         <CollapsibleTrigger asChild>
                        //             <SidebarMenuButton
                        //                 tooltip={item.title}
                        //                 className="hover:cursor-pointer">
                        //                 {item.icon && <item.icon className="size-6" />}
                        //                 <span>{item.title}</span>
                        //                 <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        //             </SidebarMenuButton>
                        //         </CollapsibleTrigger>
                        //         <CollapsibleContent>
                        //             <SidebarMenuSub>
                        //                 {item.items?.map((subItem) => (
                        //                     <SidebarMenuSubItem key={subItem.title}>
                        //                         <SidebarMenuSubButton asChild>
                        //                             <Link href={subItem.url}>
                        //                                 <span>{subItem.title}</span>
                        //                             </Link>
                        //                         </SidebarMenuSubButton>
                        //                     </SidebarMenuSubItem>
                        //                 ))}
                        //             </SidebarMenuSub>
                        //         </CollapsibleContent>
                        //     </SidebarMenuItem>
                        // </Collapsible>

                        <BookCollapsible key={item.id} book={item} index={index} />
                    ))}
                </SidebarMenu>
            )}
        </SidebarGroup>
    )
}
