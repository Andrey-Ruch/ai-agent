import type { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'
import {
    Bold,
    Italic,
    Underline,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Redo2,
    Undo2,
} from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'
import { Separator } from '@/components/ui/separator'

export default function MenuBar({ editor }: { editor: Editor }) {
    // Read the current editor's state, and re-render the component when it changes
    const editorState = useEditorState({
        editor,
        selector: (ctx) => {
            return {
                // Bold
                isBold: ctx.editor.isActive('bold'),
                canBold: ctx.editor.can().chain().focus().toggleBold().run(),

                // Italic
                isItalic: ctx.editor.isActive('italic'),
                canItalic: ctx.editor.can().chain().focus().toggleItalic().run(),

                // Underline
                isUnderline: ctx.editor.isActive('underline'),
                canUnderline: ctx.editor.can().chain().focus().toggleUnderline().run(),

                // Heading
                isHeading1: ctx.editor.isActive('heading', { level: 1 }),
                canHeading1: ctx.editor.can().chain().focus().toggleHeading({ level: 1 }).run(),
                isHeading2: ctx.editor.isActive('heading', { level: 2 }),
                canHeading2: ctx.editor.can().chain().focus().toggleHeading({ level: 2 }).run(),
                isHeading3: ctx.editor.isActive('heading', { level: 3 }),
                canHeading3: ctx.editor.can().chain().focus().toggleHeading({ level: 3 }).run(),

                // Bullet List
                isBulletList: ctx.editor.isActive('bulletList'),
                canBulletList: ctx.editor.can().chain().focus().toggleBulletList().run(),

                // Ordered List
                isOrderedList: ctx.editor.isActive('orderedList'),
                canOrderedList: ctx.editor.can().chain().focus().toggleOrderedList().run(),

                // Align Left
                isAlignLeft: ctx.editor.isActive('alignLeft'),
                canAlignLeft: ctx.editor.can().chain().focus().setTextAlign('left').run(),

                // Align Center
                isAlignCenter: ctx.editor.isActive('alignCenter'),
                canAlignCenter: ctx.editor.can().chain().focus().setTextAlign('center').run(),

                // Align Right
                isAlignRight: ctx.editor.isActive('alignRight'),
                canAlignRight: ctx.editor.can().chain().focus().setTextAlign('right').run(),

                // Undo
                canUndo: ctx.editor.can().chain().focus().undo().run(),
                canRedo: ctx.editor.can().chain().focus().redo().run(),
            }
        },
    })

    // Configuration array for all toolbar buttons
    const toolbarButtons = [
        {
            key: 'bold',
            icon: <Bold strokeWidth={3} />,
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
            key: 'underline',
            icon: <Underline />,
            action: () => editor.chain().focus().toggleUnderline().run(),
            isActive: editorState.isUnderline,
            isDisabled: !editorState.canUnderline,
        },
        {
            key: 'heading1',
            icon: <Heading1 />,
            action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: editorState.isHeading1,
            isDisabled: !editorState.canHeading1,
        },
        {
            key: 'heading2',
            icon: <Heading2 />,
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: editorState.isHeading2,
            isDisabled: !editorState.canHeading2,
        },
        {
            key: 'heading3',
            icon: <Heading3 />,
            action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: editorState.isHeading3,
            isDisabled: !editorState.canHeading3,
        },
        {
            key: 'bulletList',
            icon: <List />,
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editorState.isBulletList,
            isDisabled: !editorState.canBulletList,
        },
        {
            key: 'orderedList',
            icon: <ListOrdered />,
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editorState.isOrderedList,
            isDisabled: !editorState.canOrderedList,
        },
        {
            key: 'alignLeft',
            icon: <AlignLeft />,
            action: () => editor.chain().focus().setTextAlign('left').run(),
            isActive: editorState.isAlignLeft,
            isDisabled: !editorState.canAlignLeft,
        },
        {
            key: 'alignCenter',
            icon: <AlignCenter />,
            action: () => editor.chain().focus().setTextAlign('center').run(),
            isActive: editorState.isAlignCenter,
            isDisabled: !editorState.canAlignCenter,
        },
        {
            key: 'alignRight',
            icon: <AlignRight />,
            action: () => editor.chain().focus().setTextAlign('right').run(),
            isActive: editorState.isAlignRight,
            isDisabled: !editorState.canAlignRight,
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
        <div className="bg-white p-1 space-x-2 rounded-t-lg border-b">
            {toolbarButtons.map(({ key, icon, action, isActive, isDisabled }) => (
                <Toggle
                    key={key}
                    pressed={isActive}
                    onPressedChange={action}
                    disabled={isDisabled}
                    className="text-primary cursor-pointer">
                    {icon}
                    </Toggle>
                ))}
        </div>
    )
}
