import { Metadata } from 'next'
import { TranscriptProvider } from '@/app/contexts/TranscriptContext'
import { EventProvider } from '@/app/contexts/EventContext'
import { FunctionResultsProvider } from '@/app/contexts/FunctionResultsContext'
import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export const metadata: Metadata = {
    title: 'Workspace',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarInset>
                <TranscriptProvider>
                    <EventProvider>
                        <FunctionResultsProvider>
                            <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
                                <div className="flex items-center gap-2 px-4">
                                    <SidebarTrigger className="-ml-1 hover:cursor-pointer" />
                                    <Separator
                                        orientation="vertical"
                                        className="mr-2 data-[orientation=vertical]:h-4"
                                    />
                                </div>
                            </header>
                            {children}
                        </FunctionResultsProvider>
                    </EventProvider>
                </TranscriptProvider>
            </SidebarInset>
        </SidebarProvider>
    )
}
