import { TranscriptProvider } from '@/app/contexts/TranscriptContext'
import { EventProvider } from '@/app/contexts/EventContext'
import { FunctionResultsProvider } from '@/app/contexts/FunctionResultsContext'
import RealTimeConversation from '@/components/RealTimeConversation'
import RealTimeConversation_v2 from '@/components/RealTimeConversation_v2'
import Editor from '@/components/Editor'
import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <TranscriptProvider>
                    <EventProvider>
                        <FunctionResultsProvider>
                            <ResizablePanelGroup direction="horizontal">
                                <ResizablePanel defaultSize={50} minSize={30}>
                                    <header className="bg-background sticky top-0 z-50 flex w-full items-center p-4 pb-2">
                                        <div className="flex items-center gap-2 px-4">
                                            <SidebarTrigger className="-ml-1" />
                                            <Separator
                                                orientation="vertical"
                                                className="mr-2 data-[orientation=vertical]:h-4"
                                            />
                                        </div>
                                    </header>
                                    <RealTimeConversation_v2 />
                                </ResizablePanel>
                                <ResizableHandle withHandle />
                                <ResizablePanel defaultSize={50} minSize={25}>
                                    <Editor />
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </FunctionResultsProvider>
                    </EventProvider>
                </TranscriptProvider>
            </SidebarInset>
        </SidebarProvider>
    )
}
