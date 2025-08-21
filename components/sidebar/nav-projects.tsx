'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
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
import { type LucideIcon, ChevronRight } from 'lucide-react'

interface Book {
    id: string
    title: string
    icon?: LucideIcon
    isActive?: boolean
    activeChapterId?: string | null
}

interface Chapter {
    _id: string
    title: string
}

function ChapterList({
    chapters,
    bookId,
    activeChapterId,
}: {
    chapters: Chapter[]
    bookId: string
    activeChapterId: string | null | undefined
}) {
    return (
        <>
            {chapters.map((chapter) => (
                <SidebarMenuSubItem key={chapter._id}>
                    <SidebarMenuSubButton asChild isActive={activeChapterId === chapter._id}>
                        <Link
                            href={`/dashboard/books/${bookId}/chapters/${chapter._id}?agentConfig=ghostwriter`}>
                            {chapter.title}
                        </Link>
                    </SidebarMenuSubButton>
                </SidebarMenuSubItem>
            ))}
        </>
    )
}

function ChaptersContent({
    chapters,
    isLoading,
    isError,
    bookId,
    activeChapterId,
}: {
    chapters: Chapter[]
    isLoading: boolean
    isError: boolean
    bookId: string
    activeChapterId: string | null | undefined
}) {
    function getMessageClasses() {
        return 'px-2 py-1 text-sm text-muted-foreground'
    }

    if (isLoading) return <div className={getMessageClasses()}>Loading chapters...</div>
    if (isError) return <div className={getMessageClasses()}>Error loading chapters</div>
    if (chapters.length === 0) return <div className={getMessageClasses()}>No chapters yet</div>

    return <ChapterList chapters={chapters} bookId={bookId} activeChapterId={activeChapterId} />
}

function ProjectCollapsible({ book }: { book: Book }) {
    const [isOpen, setIsOpen] = useState(false)
    const { chapters = [], isLoading, isError } = useChapters(isOpen ? book.id : '')

    // Update local state when book.isActive changes (when URL changes)
    useEffect(() => {
        if (book.isActive && !isOpen) {
            setIsOpen(true)
        }
    }, [book.isActive, isOpen])

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
    }

    return (
        <Collapsible
            key={book.id}
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
                    {/* <SidebarMenuSub>
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
                    </SidebarMenuSub> */}

                    <SidebarMenuSub>
                        <ChaptersContent
                            chapters={chapters}
                            isLoading={isLoading}
                            isError={isError}
                            bookId={book.id}
                            activeChapterId={book.activeChapterId}
                        />
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
    projects: Book[]
    isLoading: boolean
    isError: boolean
}) {
    if (isError) return <div className="px-4 text-sm text-red-600">Error loading books</div>

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            {isLoading ? (
                <div className="p-2 text-sm text-muted-foreground">Loading...</div>
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

                        <ProjectCollapsible key={index} book={item} />
                    ))}
                </SidebarMenu>
            )}
        </SidebarGroup>
    )
}
