'use client'

// React
import { use, useState, useEffect } from 'react'

// Contexts
import { useFunctionResults } from '@/app/contexts/FunctionResultsContext'

// Hooks
import useChapter from '@/hooks/useChapter'

// Components
import Loading from '@/components/Loading'
import ErrorMessage from '@/components/ErrorMessage'
import RealTimeConversation_v2 from '@/components/RealTimeConversation/RealTimeConversation_v2'
import TipTapEditor from '@/components/tiptap-editor'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function ChapterPage({
    params,
}: {
    params: Promise<{ bookId: string; chapterId: string }>
}) {
    const { bookId, chapterId } = use(params)
    const { chapter, isLoading, isError, updateChapter } = useChapter(bookId, chapterId)
    const { functionResults } = useFunctionResults()

    const [chapterContent, setChapterContent] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    useEffect(() => {
        if (chapter?.content) {
            setChapterContent(chapter.content)
            setHasUnsavedChanges(false)
        }
    }, [chapter?.content])

    // Listen for new generateChapterDraft results and update editor content
    useEffect(() => {
        console.log('\nfunctionResults', functionResults)

        const latestChapterDraft = functionResults
            .filter((result) => result.functionName === 'generate_chapter_draft')
            .at(-1)

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
        setHasUnsavedChanges(content !== chapter?.content)
        console.log('onChapterContentChange content:\n', content)
    }

    async function handleSave() {
        if (!hasUnsavedChanges) return

        try {
            setIsSaving(true)
            await updateChapter({ content: chapterContent })
            setHasUnsavedChanges(false)
            toast.success('Chapter saved successfully')
        } catch (error) {
            console.error('Failed to save chapter:', error)
            toast.error('Failed to save chapter')
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) return <Loading />
    if (isError) return <ErrorMessage message={isError.message} />
    if (!chapter) return <div className="p-2">No chapters yet</div>

    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} minSize={30}>
                <RealTimeConversation_v2 />
                {/* <div className="p-2">Chat</div> */}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={25}>
                {/* Editor panel with button below */}
                <div className="h-full flex flex-col items-center gap-2 p-2">
                    <div className="flex-1 min-h-0">
                        <TipTapEditor content={chapterContent} onChange={onChapterContentChange} />
                    </div>

                    <Button
                        onClick={handleSave}
                        disabled={!hasUnsavedChanges || isSaving}
                        
                        className="cursor-pointer">
                        {isSaving ? 'Saving...' : 'Save'}
                    </Button>
                </div>
                {/* <TipTapEditor content={chapterContent} onChange={onChapterContentChange} /> */}
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
