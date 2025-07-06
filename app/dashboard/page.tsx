import { TranscriptProvider } from '@/app/contexts/TranscriptContext'
import App from '../../components/App'
import { AppSidebar } from '@/components/app-sidebar'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel minSize={30}>
                        <header className="bg-background sticky top-0 z-50 flex w-full items-center p-4 pb-2">
                            <div className="flex items-center gap-2 px-4">
                                <SidebarTrigger className="-ml-1" />
                                <Separator
                                    orientation="vertical"
                                    className="mr-2 data-[orientation=vertical]:h-4"
                                />
                            </div>
                        </header>
                        <div className="flex flex-1 flex-col gap-4">
                            <TranscriptProvider>
                                <App />
                            </TranscriptProvider>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel minSize={25}>
                        <div className="h-full w-full bg-white">Editor</div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </SidebarInset>
        </SidebarProvider>
    )
}
