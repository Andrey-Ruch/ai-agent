import RealTimeConversation_v2 from '@/components/RealTimeConversation_v2'
import Editor from '@/components/Editor'
import TipTapEditor from '@/components/tiptap-editor'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

export default async function Page() {
    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} minSize={30}>
                <RealTimeConversation_v2 />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={25}>
                {/* <Editor /> */}
                <TipTapEditor />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
