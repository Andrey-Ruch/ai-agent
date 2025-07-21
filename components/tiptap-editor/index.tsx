'use client'


import { useEditor, EditorContent } from '@tiptap/react'

// --- Tiptap Core Extensions ---
import { TextStyleKit } from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'

// --- Styles ---
// import '@/components/tiptap-templates/simple/simple-editor.scss'

// --- Components ---
import MenuBar from '@/components/tiptap-editor/menu-bar'

const extensions = [TextStyleKit, StarterKit]

export default function TipTapEditor() {
    const editor = useEditor({
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
        shouldRerenderOnTransaction: false,
        editorProps: {
            attributes: {
                autocomplete: 'off',
                autocorrect: 'off',
                autocapitalize: 'off',
                'aria-label': 'Main content area, start typing to enter text.',
                class: 'rounded-lg py-2 px-3 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
            },
        },
        extensions,
        content: '<p>Hello World! 🌎️</p>',
    })

    return (
        // Simple-editor-wrapper
        <div className="max-w-2xl mx-auto h-full flex flex-col gap-2">
            <MenuBar editor={editor} />
            <EditorContent
                editor={editor}
                role="presentation"
                className="h-full flex flex-col flex-1 my-0 rounded-lg bg-white"
            />
        </div>
    )
}
