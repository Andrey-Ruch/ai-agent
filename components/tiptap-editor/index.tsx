'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { useEffect, useState } from 'react'

// --- Tiptap Core Extensions ---
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'

// --- Components ---
import MenuBar from '@/components/tiptap-editor/menu-bar'

interface TipTapEditorProps {
    content: string
    onChange: (content: string) => void
}

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
    Image.configure({
        HTMLAttributes: {
            class: 'max-w-full h-auto',
        },
        allowBase64: true, // Allow base64 images during development
    }),
]

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
    const [isContentUpdating, setIsContentUpdating] = useState(false)

    const editor = useEditor({
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
        shouldRerenderOnTransaction: false,
        editorProps: {
            attributes: {
                class: 'rounded-lg px-6 py-4 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
            },
        },
        extensions,
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    // Sync external content changes to the editor
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            setIsContentUpdating(true)
            editor.commands.setContent(content)

            // Remove the updating state after animation completes
            setTimeout(() => setIsContentUpdating(false), 5000)
        }
    }, [content])

    if (!editor) {
        return null
    }

    return (
        // In the calc function, 3rem refers to the height of the header in dashboard/layout.tsx
        <div className="h-[calc(100vh-7rem)] flex flex-col">
            {/* Simple-editor-wrapper */}
            <div
                className={`flex flex-col w-full max-w-2xl mx-auto h-full gap-2 rounded-lg bg-white border transition-all duration-300 ${
                    isContentUpdating ? 'ring-2 ring-green-400 ring-opacity-75' : ''
                }`}>
                <MenuBar editor={editor} />
                <EditorContent
                    editor={editor}
                    role="presentation"
                    className="h-full flex flex-col flex-1 my-0 text-[15px] overflow-y-auto"
                    dir="auto"
                />
            </div>
        </div>
    )
}
