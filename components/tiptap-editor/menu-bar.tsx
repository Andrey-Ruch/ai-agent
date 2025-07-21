import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'
import {
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Italic,
    List,
    ListOrdered,
    Redo2,
    Undo2,
} from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'

export default function MenuBar({ editor }: { editor: Editor | null }) {
    if (!editor) {
        return null
    }

    // Read the current editor's state, and re-render the component when it changes
    const editorState = useEditorState({
        editor,
        selector: (ctx) => {
            return {
                isBold: ctx.editor.isActive('bold'),
                canBold: ctx.editor.can().chain().focus().toggleBold().run(),
                isItalic: ctx.editor.isActive('italic'),
                canItalic: ctx.editor.can().chain().focus().toggleItalic().run(),
                isHeading1: ctx.editor.isActive('heading', { level: 1 }),
                isHeading2: ctx.editor.isActive('heading', { level: 2 }),
                isHeading3: ctx.editor.isActive('heading', { level: 3 }),
                isBulletList: ctx.editor.isActive('bulletList'),
                isOrderedList: ctx.editor.isActive('orderedList'),
                canUndo: ctx.editor.can().chain().focus().undo().run(),
                canRedo: ctx.editor.can().chain().focus().redo().run(),
            }
        },
    })

    // Configuration array for all toolbar buttons
    const toolbarButtons = [
        {
            key: 'bold',
            icon: <Bold />,
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: editorState.isBold,
            isDisabled: !editorState.canBold,
        },
        {
            key: 'italic',
            icon: <Italic />,
            action: () => editor.chain().focus().toggleItalic().run(),
            isActive: editorState.isItalic,
            isDisabled: !editorState.canItalic,
        },
        {
            key: 'heading1',
            icon: <Heading1 />,
            action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: editorState.isHeading1,
        },
        {
            key: 'heading2',
            icon: <Heading2 />,
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: editorState.isHeading2,
        },
        {
            key: 'heading3',
            icon: <Heading3 />,
            action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: editorState.isHeading3,
        },
        {
            key: 'bulletList',
            icon: <List />,
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editorState.isBulletList,
        },
        {
            key: 'orderedList',
            icon: <ListOrdered />,
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editorState.isOrderedList,
        },
        {
            key: 'undo',
            icon: <Undo2 />,
            action: () => editor.chain().focus().undo().run(),
            isDisabled: !editorState.canUndo,
        },
        {
            key: 'redo',
            icon: <Redo2 />,
            action: () => editor.chain().focus().redo().run(),
            isDisabled: !editorState.canRedo,
        },
    ]

    return (
        <div className="control-group bg-white rounded-lg p-1 space-x-2">
            {toolbarButtons.map(({ key, icon, action, isActive, isDisabled }) => (
                <Toggle
                    key={key}
                    onClick={action}
                    disabled={isDisabled}
                    pressed={isActive}
                    className="cursor-pointer"
                >
                    {icon}
                </Toggle>
            ))}
        </div>
    )
}
