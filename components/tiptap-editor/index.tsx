'use client'

import { useEditor, EditorContent } from '@tiptap/react'

// --- Tiptap Core Extensions ---
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'

// --- Components ---
import MenuBar from '@/components/tiptap-editor/menu-bar'

const extensions = [
    StarterKit.configure({
        bulletList: {
            HTMLAttributes: {
                class: 'list-disc ml-3',
            },
        },
        orderedList: {
            HTMLAttributes: {
                class: 'list-decimal ml-3',
            },
        },
    }),
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
]

export default function TipTapEditor() {
    const editor = useEditor({
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
        // shouldRerenderOnTransaction: false,
        editorProps: {
            attributes: {
                autocomplete: 'off',
                autocorrect: 'off',
                autocapitalize: 'off',
                'aria-label': 'Main content area, start typing to enter text.',
                class: 'rounded-lg px-6 py-4 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
            },
        },
        extensions,
        content: '<p>Hello World! 🌎️</p>',
    })

    if (!editor) {
        return null
    }

    return (
        <div className="h-full p-2">
            {/* Simple-editor-wrapper */}
            <div className="flex flex-col max-w-2xl mx-auto h-full gap-2 rounded-lg bg-white border">
                <MenuBar editor={editor} />
                <EditorContent
                    editor={editor}
                    role="presentation"
                    className="h-full flex flex-col flex-1 my-0"
                />
            </div>
        </div>
    )
}
