import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import TipTapEditor from '@/components/tiptap-editor'

interface ChapterEditorProps {
    title: string
    content: string
    hasUnsavedChanges: boolean
    isSaving: boolean
    onTitleChange: (title: string) => void
    onContentChange: (content: string) => void
    onSave: () => void
}

export default function ChapterEditor({
    title,
    content,
    hasUnsavedChanges,
    isSaving,
    onTitleChange,
    onContentChange,
    onSave,
}: ChapterEditorProps) {
    return (
        <div className="h-full flex flex-col max-w-2xl mx-auto gap-2 p-2">
            {/* Title */}
            <div className="flex flex-col gap-2">
                <Label className="text-primary">Chapter Title</Label>
                <Input
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    className="w-full bg-white font-bold"
                    dir="auto"
                    required
                />
            </div>

            {/* Editor */}
            <div className="flex-1 min-h-0">
                <TipTapEditor content={content} onChange={onContentChange} />
            </div>

            {/* Save button */}
            <div className="flex justify-end">
                <Button
                    onClick={onSave}
                    disabled={!hasUnsavedChanges || isSaving || !title.trim()}
                    aria-label={isSaving ? 'Saving chapter...' : 'Save chapter'}
                    className="cursor-pointer">
                    {isSaving ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </div>
    )
}
