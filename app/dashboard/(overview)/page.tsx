'use client'

import { useState, useEffect } from 'react'
import RealTimeConversation_v2 from '@/components/RealTimeConversation/RealTimeConversation_v2'
import TipTapEditor from '@/components/tiptap-editor'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useFunctionResults } from '@/app/contexts/FunctionResultsContext'

export default function Page() {
    const { functionResults } = useFunctionResults()

    const [chapterContent, setChapterContent] = useState('\n\n')

    // Listen for new generateChapterDraft results and update editor content
    useEffect(() => {
        console.log('\nfunctionResults', functionResults)

        const latestChapterDraft = functionResults
            .filter((result) => result.functionName === 'generate_chapter_draft').at(-1)

        console.log('\nlatestChapterDraft', latestChapterDraft)

        if (latestChapterDraft?.result) {
            const { title, text } = latestChapterDraft.result

            // Format the content with title as heading and text as body
            const formattedContent = `<h1>${title}</h1><p>${text}</p>`

            setChapterContent(formattedContent)
        }
    }, [functionResults])

    function onChapterContentChange(content: string) {
        setChapterContent(content)
        // console.log(content)
    }

    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} minSize={30}>
                <RealTimeConversation_v2 />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={25}>
                <TipTapEditor content={chapterContent} onChange={onChapterContentChange} />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
