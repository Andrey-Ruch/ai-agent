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
import ChapterEditor from '@/components/ChapterEditor'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { toast } from 'sonner'

export default function ChapterPage({
    params,
}: {
    params: Promise<{ bookId: string; chapterId: string }>
}) {
    const { bookId, chapterId } = use(params)
    const { chapter, isLoading, isError, updateChapter } = useChapter(bookId, chapterId)
    const { functionResults } = useFunctionResults()

    const [chapterTitle, setChapterTitle] = useState('')
    const [chapterContent, setChapterContent] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    useEffect(() => {
        if (chapter) {
            setChapterTitle(chapter.title || '')
            setChapterContent(chapter.content || '')
            setHasUnsavedChanges(false)
        }
    }, [chapter])

    // Listen for new generateChapterDraft results and update editor content
    useEffect(() => {
        const latestChapterDraft = functionResults
            .filter((result) => result.functionName === 'generate_chapter_draft')
            .at(-1)

        if (latestChapterDraft?.result) {
            const { title, text } = latestChapterDraft.result
            setChapterTitle(title)
            setChapterContent(text)

            // Format the content with title as heading and text as body
            // const formattedContent = `<h1>${title}</h1><p>${text}</p>`
            // setChapterContent(formattedContent)
        }
    }, [functionResults])

    function onChapterTitleChange(title: string) {
        setChapterTitle(title)
        setHasUnsavedChanges(title !== chapter?.title || chapterContent !== chapter?.content)
    }

    function onChapterContentChange(content: string) {
        setChapterContent(content)
        setHasUnsavedChanges(chapterTitle !== chapter?.title || content !== chapter?.content)
    }

    async function handleSave() {
        if (!hasUnsavedChanges || !chapterTitle.trim() || isSaving) return

        try {
            setIsSaving(true)
            await updateChapter({
                title: chapterTitle,
                content: chapterContent,
            })
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
                <ChapterEditor
                    title={chapterTitle}
                    content={chapterContent}
                    hasUnsavedChanges={hasUnsavedChanges}
                    isSaving={isSaving}
                    onTitleChange={onChapterTitleChange}
                    onContentChange={onChapterContentChange}
                    onSave={handleSave}
                />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
