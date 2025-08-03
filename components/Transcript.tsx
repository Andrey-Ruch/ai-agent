'use client'

import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { TranscriptItem } from '@/app/types'
import { useTranscript } from '@/app/contexts/TranscriptContext'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'
import AgentRespondingIndicator from './AgentRespondingIndicator'

export interface TranscriptProps {
    userText: string
    setUserText: (val: string) => void
    onSendMessage: () => void
    canSend: boolean
    downloadRecording: () => void
    isAgentResponding: boolean
}

// TODO: Improve the maintenance of this component by breaking it down into smaller,
// focused components and improving code organization.
// Here's a plan:
// Extract sub-components for different message types
// Create reusable constants and styling patterns
// Remove dead code and improve organization
export default function Transcript({
    userText,
    setUserText,
    onSendMessage,
    canSend,
    // downloadRecording,
    isAgentResponding = false,
}: TranscriptProps) {
    const {
        transcriptItems,
        // toggleTranscriptItemExpand
    } = useTranscript()
    const transcriptRef = useRef<HTMLDivElement | null>(null)
    const [prevLogs, setPrevLogs] = useState<TranscriptItem[]>([])
    // const [justCopied, setJustCopied] = useState(false)
    const inputRef = useRef<HTMLTextAreaElement | null>(null)

    function scrollToBottom() {
        if (transcriptRef.current) {
            transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
        }
    }

    useEffect(() => {
        const hasNewMessage = transcriptItems.length > prevLogs.length
        const hasUpdatedMessage = transcriptItems.some((newItem, index) => {
            const oldItem = prevLogs[index]
            return oldItem && (newItem.title !== oldItem.title || newItem.data !== oldItem.data)
        })

        if (hasNewMessage || hasUpdatedMessage) {
            scrollToBottom()
        }

        setPrevLogs(transcriptItems)
    }, [transcriptItems])

    // Autofocus on text box input on load
    useEffect(() => {
        if (canSend && inputRef.current) {
            inputRef.current.focus()
        }
    }, [canSend])

    return (
        <div className="flex flex-col flex-1 min-h-0 rounded-xl">
            <div className="flex flex-col flex-1 min-h-0">
                {/* Transcript Content */}
                <div ref={transcriptRef} className="overflow-auto p-4 flex flex-col gap-y-4 h-full">
                    {[...transcriptItems]
                        .sort((a, b) => a.createdAtMs - b.createdAtMs)
                        .map((item) => {
                            const {
                                itemId,
                                type,
                                role,
                                // data,
                                // expanded,
                                // timestamp,
                                title = '',
                                isHidden,
                                // status,
                                guardrailResult,
                            } = item

                            if (isHidden) {
                                return null
                            }

                            if (type === 'MESSAGE') {
                                const isUser = role === 'user'
                                const containerClasses = `flex justify-end flex-col text-[15px] ${
                                    isUser ? 'items-end' : 'items-start'
                                }`
                                const bubbleBase = `max-w-lg p-3 ${
                                    isUser
                                        ? 'bg-[#D5B99C]/40 text-slate-800'
                                        : 'bg-gray-200 text-slate-800'
                                }`

                                const isTranscribing =
                                    title === '[Transcribing...]' || title === 'Transcribing…'

                                const isBracketedMessage =
                                    title.startsWith('[') && title.endsWith(']')
                                const messageStyle = isBracketedMessage
                                    ? 'italic text-gray-400'
                                    : ''
                                const displayTitle = isBracketedMessage ? title.slice(1, -1) : title

                                return (
                                    <div key={itemId} className={containerClasses}>
                                        <div className="max-w-lg">
                                            <div
                                                className={`${bubbleBase} rounded-xl ${
                                                    guardrailResult ? '' : 'rounded-b-xl'
                                                } ${isTranscribing ? 'animate-pulse' : ''}`}>
                                                <div
                                                    className={`whitespace-pre-wrap ${messageStyle} ${
                                                        isTranscribing ? 'opacity-70' : ''
                                                    }`}
                                                    dir="auto">
                                                    <ReactMarkdown>{displayTitle}</ReactMarkdown>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else if (type === 'BREADCRUMB') {
                                return null
                                // return (
                                //     <div
                                //         key={itemId}
                                //         className="flex flex-col justify-start items-start text-gray-500 text-sm">
                                //         <span className="text-xs font-mono">{timestamp}</span>
                                //         <div
                                //             className={`whitespace-pre-wrap flex items-center font-mono text-sm text-gray-800 ${
                                //                 data ? 'cursor-pointer' : ''
                                //             }`}
                                //             onClick={() =>
                                //                 data && toggleTranscriptItemExpand(itemId)
                                //             }>
                                //             {data && (
                                //                 <span
                                //                     className={`text-gray-400 mr-1 transform transition-transform duration-200 select-none font-mono ${
                                //                         expanded ? 'rotate-90' : 'rotate-0'
                                //                     }`}>
                                //                     ▶
                                //                 </span>
                                //             )}
                                //             {title}
                                //         </div>
                                //         {expanded && data && (
                                //             <div className="text-gray-800 text-left">
                                //                 <pre className="border-l-2 ml-1 border-gray-200 whitespace-pre-wrap break-words font-mono text-xs mb-2 mt-2 pl-2">
                                //                     {JSON.stringify(data, null, 2)}
                                //                 </pre>
                                //             </div>
                                //         )}
                                //     </div>
                                // )
                            } else {
                                // Fallback if type is neither MESSAGE nor BREADCRUMB
                                return (
                                    <div
                                        key={itemId}
                                        className="flex justify-start items-center text-gray-500 text-sm italic font-mono">
                                        Unknown item type: {type}
                                        {/* <span className="ml-2 text-xs">{timestamp}</span> */}
                                    </div>
                                )
                            }
                        })}

                    {isAgentResponding && <AgentRespondingIndicator />}
                </div>
            </div>

            <div className="pt-1 px-2 pb-3 flex flex-col flex-shrink-0 rounded-xl bg-white border shadow-sm">
                <textarea
                    name="user-text-message"
                    ref={inputRef}
                    value={userText}
                    onChange={(e) => setUserText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey && canSend) {
                            e.preventDefault()
                            onSendMessage()
                        }
                    }}
                    className="flex-1 px-2 py-2 focus:outline-none resize-none rounded-md"
                    placeholder="Type a message..."
                    rows={2}
                    dir="auto"
                />
                <Button
                    size="icon"
                    onClick={onSendMessage}
                    disabled={!canSend || !userText.trim()}
                    className="hover:cursor-pointer rounded-full self-end">
                    <ArrowUp className="size-6" />
                </Button>
            </div>
        </div>
    )
}
