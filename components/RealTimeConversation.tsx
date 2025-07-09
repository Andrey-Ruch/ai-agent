'use client'

import React, { useEffect, useRef, useState } from 'react'

// UI components
import Transcript from '@/components/Transcript'
import ToolBar from '@/components/ToolBar'
import Events from '@/components/Events'

// Types
import { SessionStatus, TranscriptItem } from '../app/types'
import type { RealtimeAgent } from '@openai/agents/realtime'

// Context providers & hooks
import { useTranscript } from '@/app/contexts/TranscriptContext'
import useAudioDownload from '@/hooks/useAudioDownload'

// Utilities
import { RealtimeClient } from '@/app/agentConfigs/realtimeClient'
import { ghostwriterAgent } from '@/app/agentConfigs/ghostwriter'

export default function RealTimeConversation() {
    const {
        transcriptItems,
        addTranscriptMessage,
        addTranscriptBreadcrumb,
        updateTranscriptMessage,
        updateTranscriptItem,
    } = useTranscript()

    // Keep a mutable reference to the latest transcriptItems so that streaming
    // callbacks registered once during setup always have access to up-to-date
    // data without being re-registered on every render.
    const transcriptItemsRef = useRef<TranscriptItem[]>(transcriptItems)
    useEffect(() => {
        transcriptItemsRef.current = transcriptItems
    }, [transcriptItems])

    const audioElementRef = useRef<HTMLAudioElement | null>(null)

    const sdkAudioElement = React.useMemo(() => {
        if (typeof window === 'undefined') return undefined

        const el = document.createElement('audio')
        el.autoplay = true
        el.style.display = 'none'
        document.body.appendChild(el)
        return el
    }, [])

    // Attach SDK audio element once it exists (after first render in browser)
    useEffect(() => {
        if (sdkAudioElement && !audioElementRef.current) {
            audioElementRef.current = sdkAudioElement
        }
    }, [sdkAudioElement])

    const sdkClientRef = useRef<RealtimeClient | null>(null)
    const loggedFunctionCallsRef = useRef<Set<string>>(new Set())
    const [sessionStatus, setSessionStatus] = useState<SessionStatus>('DISCONNECTED')

    const [userText, setUserText] = useState<string>('')
    const [isPTTActive, setIsPTTActive] = useState<boolean>(false) // false
    const [isPTTUserSpeaking, setIsPTTUserSpeaking] = useState<boolean>(false)
    const [isAudioPlaybackEnabled, setIsAudioPlaybackEnabled] = useState<boolean>(() => {
        if (typeof window === 'undefined') return true
        const stored = localStorage.getItem('audioPlaybackEnabled')
        return stored ? stored === 'true' : true
    })

    // Initialize the recording hook.
    const { startRecording, stopRecording, downloadRecording } = useAudioDownload()

    const sendClientEvent = (eventObj: any, eventNameSuffix = '') => {
        if (!sdkClientRef.current) {
            console.error('SDK client not available', eventObj)
            return
        }

        try {
            sdkClientRef.current.sendEvent(eventObj)
        } catch (err) {
            console.error('Failed to send via SDK', err)
        }
    }

    // useEffect(() => {
    //     if (sessionStatus === 'DISCONNECTED') {
    //         connectToRealtime()
    //     }
    // }, [])

    useEffect(() => {
        if (sessionStatus === 'CONNECTED') {
            console.log(
                `updatingSession, isPTTACtive=${isPTTActive} sessionStatus=${sessionStatus}`
            )
            updateSession()
        }
    }, [isPTTActive])

    const fetchEphemeralKey = async (): Promise<string | null> => {
        const tokenResponse = await fetch('/api/session')
        const data = await tokenResponse.json()

        if (!data.client_secret?.value) {
            console.error('No ephemeral key provided by the server')
            setSessionStatus('DISCONNECTED')
            return null
        }

        return data.client_secret.value
    }

    const connectToRealtime = async () => {
        // Use new SDK path
        if (sessionStatus !== 'DISCONNECTED') return
        setSessionStatus('CONNECTING')

        try {
            const EPHEMERAL_KEY = await fetchEphemeralKey()
            if (!EPHEMERAL_KEY) return

            const client = new RealtimeClient({
                getEphemeralKey: async () => EPHEMERAL_KEY,
                initialAgent: ghostwriterAgent,
                audioElement: sdkAudioElement,
                extraContext: {
                    addTranscriptBreadcrumb,
                },
            } as any)

            sdkClientRef.current = client

            client.on('connection_change', (status) => {
                if (status === 'connected') setSessionStatus('CONNECTED')
                else if (status === 'connecting') setSessionStatus('CONNECTING')
                else setSessionStatus('DISCONNECTED')
            })

            client.on('message', (ev) => {
                console.log('client.on(message), ev =', ev)

                // --- Realtime streaming handling ---------------------------------
                // The Realtime transport emits granular *delta* events while the
                // assistant is speaking or while the user's audio is still being
                // transcribed. Those events were previously only logged which made
                // the UI update only once when the final conversation.item.* event
                // arrived – effectively disabling streaming. We now listen for the
                // delta events and update the transcript as they arrive so that
                // 1) assistant messages stream token-by-token, and
                // 2) the user sees a live "Transcribing…" placeholder while we are
                //    still converting their speech to text.

                // NOTE: The exact payloads are still evolving.  We intentionally
                // access properties defensively to avoid runtime crashes if fields
                // are renamed or missing.

                try {
                    // Guardrail trip event – mark last assistant message as FAIL
                    if (ev.type === 'guardrail_tripped') {
                        const lastAssistant = [...transcriptItemsRef.current]
                            .reverse()
                            .find((i) => i.role === 'assistant')

                        if (lastAssistant) {
                            updateTranscriptItem(lastAssistant.itemId, {
                                guardrailResult: {
                                    status: 'DONE',
                                    category: 'OFF_BRAND',
                                    rationale: 'Guardrail triggered',
                                    testText: '',
                                },
                            } as any)
                        }
                        return
                    }

                    // Response finished – if we still have Pending guardrail mark as
                    // Pass. This event fires once per assistant turn.
                    if (ev.type === 'response.done') {
                        const lastAssistant = [...transcriptItemsRef.current]
                            .reverse()
                            .find((i) => i.role === 'assistant')

                        if (lastAssistant) {
                            const existing: any = (lastAssistant as any).guardrailResult
                            if (!existing || existing.status === 'IN_PROGRESS') {
                                updateTranscriptItem(lastAssistant.itemId, {
                                    guardrailResult: {
                                        status: 'DONE',
                                        category: 'NONE',
                                        rationale: '',
                                    },
                                } as any)
                            }
                        }
                        // continue processing other logic if needed
                    }
                    // Assistant text (or audio-to-text) streaming
                    if (
                        ev.type === 'response.text.delta' ||
                        ev.type === 'response.audio_transcript.delta'
                    ) {
                        const itemId: string | undefined = (ev as any).item_id ?? (ev as any).itemId
                        const delta: string | undefined = (ev as any).delta ?? (ev as any).text
                        if (!itemId || !delta) return

                        // Ensure a transcript message exists for this assistant item.
                        if (!transcriptItemsRef.current.some((t) => t.itemId === itemId)) {
                            addTranscriptMessage(itemId, 'assistant', '')
                            updateTranscriptItem(itemId, {
                                guardrailResult: {
                                    status: 'IN_PROGRESS',
                                },
                            } as any)
                        }

                        // Append the latest delta so the UI streams.
                        updateTranscriptMessage(itemId, delta, true)
                        updateTranscriptItem(itemId, { status: 'IN_PROGRESS' })
                        return
                    }

                    // Live user transcription streaming
                    if (ev.type === 'conversation.input_audio_transcription.delta') {
                        const itemId: string | undefined = (ev as any).item_id ?? (ev as any).itemId
                        const delta: string | undefined = (ev as any).delta ?? (ev as any).text
                        if (!itemId || typeof delta !== 'string') return

                        // If this is the very first chunk, create a hidden user message
                        // so that we can surface "Transcribing…" immediately.
                        if (!transcriptItemsRef.current.some((t) => t.itemId === itemId)) {
                            addTranscriptMessage(itemId, 'user', 'Transcribing…')
                        }

                        updateTranscriptMessage(itemId, delta, true)
                        updateTranscriptItem(itemId, { status: 'IN_PROGRESS' })
                    }

                    // Detect start of a new user speech segment when VAD kicks in.
                    if (ev.type === 'input_audio_buffer.speech_started') {
                        const itemId: string | undefined = (ev as any).item_id
                        if (!itemId) return

                        const exists = transcriptItemsRef.current.some((t) => t.itemId === itemId)
                        if (!exists) {
                            addTranscriptMessage(itemId, 'user', 'Transcribing…')
                            updateTranscriptItem(itemId, { status: 'IN_PROGRESS' })
                        }
                    }

                    // Final transcript once Whisper finishes
                    if (ev.type === 'conversation.item.input_audio_transcription.completed') {
                        const itemId: string | undefined = (ev as any).item_id
                        const transcriptText: string | undefined = (ev as any).transcript
                        if (!itemId || typeof transcriptText !== 'string') return

                        const exists = transcriptItemsRef.current.some((t) => t.itemId === itemId)
                        if (!exists) {
                            addTranscriptMessage(itemId, 'user', transcriptText.trim())
                        } else {
                            // Replace placeholder / delta text with final transcript
                            updateTranscriptMessage(itemId, transcriptText.trim(), false)
                        }
                        updateTranscriptItem(itemId, { status: 'DONE' })
                    }

                    // Assistant streaming tokens or transcript
                    if (
                        ev.type === 'response.text.delta' ||
                        ev.type === 'response.audio_transcript.delta'
                    ) {
                        const responseId: string | undefined =
                            (ev as any).response_id ?? (ev as any).responseId
                        const delta: string | undefined = (ev as any).delta ?? (ev as any).text
                        if (!responseId || typeof delta !== 'string') return

                        // We'll use responseId as part of itemId to make it deterministic.
                        const itemId = `assistant-${responseId}`

                        if (!transcriptItemsRef.current.some((t) => t.itemId === itemId)) {
                            addTranscriptMessage(itemId, 'assistant', '')
                        }

                        updateTranscriptMessage(itemId, delta, true)
                        updateTranscriptItem(itemId, { status: 'IN_PROGRESS' })
                    }
                } catch (err) {
                    // Streaming is best-effort – never break the session because of it.
                    console.warn('streaming-ui error', err)
                }
            })

            client.on('history_added', (item) => {
                console.log('client.on(history_added), item =', item)

                // Update the transcript view
                if (item.type === 'message') {
                    const textContent = (item.content || [])
                        .map((c: any) => {
                            if (c.type === 'text') return c.text
                            if (c.type === 'input_text') return c.text
                            if (c.type === 'input_audio') return c.transcript ?? ''
                            if (c.type === 'audio') return c.transcript ?? ''
                            return ''
                        })
                        .join(' ')
                        .trim()

                    if (!textContent) return

                    const role = item.role as 'user' | 'assistant'

                    // No PTT placeholder logic needed

                    const exists = transcriptItemsRef.current.some((t) => t.itemId === item.itemId)

                    if (!exists) {
                        addTranscriptMessage(item.itemId, role, textContent, false)
                        if (role === 'assistant') {
                            updateTranscriptItem(item.itemId, {
                                guardrailResult: {
                                    status: 'IN_PROGRESS',
                                },
                            } as any)
                        }
                    } else {
                        updateTranscriptMessage(item.itemId, textContent, false)
                    }

                    // After assistant message completes, add default guardrail PASS if none present.
                    if (role === 'assistant' && (item as any).status === 'completed') {
                        const current = transcriptItemsRef.current.find(
                            (t) => t.itemId === item.itemId
                        )
                        const existing = (current as any)?.guardrailResult
                        if (existing && existing.status !== 'IN_PROGRESS') {
                            // already final (e.g., FAIL) – leave as is.
                        } else {
                            updateTranscriptItem(item.itemId, {
                                guardrailResult: {
                                    status: 'DONE',
                                    category: 'NONE',
                                    rationale: '',
                                },
                            } as any)
                        }
                    }

                    if ('status' in item) {
                        updateTranscriptItem(item.itemId, {
                            status: (item as any).status === 'completed' ? 'DONE' : 'IN_PROGRESS',
                        })
                    }
                }

                // Surface function / hand-off calls as breadcrumbs
                if (item.type === 'function_call') {
                    const title = `Tool call: ${(item as any).name}`

                    if (!loggedFunctionCallsRef.current.has(item.itemId)) {
                        addTranscriptBreadcrumb(title, {
                            arguments: (item as any).arguments,
                        })
                        loggedFunctionCallsRef.current.add(item.itemId)

                        // If this looks like a handoff (transfer_to_*), switch active
                        // agent so subsequent session updates & breadcrumbs reflect the
                        // new agent. The Realtime SDK already updated the session on
                        // the backend; this only affects the UI state.
                        // const toolName: string = (item as any).name ?? ''
                        // const handoffMatch = toolName.match(/^transfer_to_(.+)$/)
                        // if (handoffMatch) {
                        //     const newAgentKey = handoffMatch[1]

                        //     // Find agent whose name matches (case-insensitive)
                        //     const candidate = selectedAgentConfigSet?.find(
                        //         (a) => a.name.toLowerCase() === newAgentKey.toLowerCase()
                        //     )
                        //     if (candidate && candidate.name !== selectedAgentName) {
                        //         setSelectedAgentName(candidate.name)
                        //     }
                        // }
                    }
                    return
                }
            })

            // Handle continuous updates for existing items so streaming assistant
            // speech shows up while in_progress.
            client.on('history_updated', (history) => {
                history.forEach((item: any) => {
                    if (item.type === 'function_call') {
                        // Update breadcrumb data (e.g., add output) once we have more info.

                        if (!loggedFunctionCallsRef.current.has(item.itemId)) {
                            addTranscriptBreadcrumb(`Tool call: ${(item as any).name}`, {
                                arguments: (item as any).arguments,
                                output: (item as any).output,
                            })
                            loggedFunctionCallsRef.current.add(item.itemId)

                            // const toolName: string = (item as any).name ?? ''
                            // const handoffMatch = toolName.match(/^transfer_to_(.+)$/)
                            // if (handoffMatch) {
                            //     const newAgentKey = handoffMatch[1]
                            //     const candidate = selectedAgentConfigSet?.find(
                            //         (a) => a.name.toLowerCase() === newAgentKey.toLowerCase()
                            //     )
                            //     if (candidate && candidate.name !== selectedAgentName) {
                            //         setSelectedAgentName(candidate.name)
                            //     }
                            // }
                        }

                        return
                    }

                    if (item.type !== 'message') return

                    const textContent = (item.content || [])
                        .map((c: any) => {
                            if (c.type === 'text') return c.text
                            if (c.type === 'input_text') return c.text
                            if (c.type === 'input_audio') return c.transcript ?? ''
                            if (c.type === 'audio') return c.transcript ?? ''
                            return ''
                        })
                        .join(' ')
                        .trim()

                    const role = item.role as 'user' | 'assistant'

                    if (!textContent) return

                    const exists = transcriptItemsRef.current.some((t) => t.itemId === item.itemId)
                    if (!exists) {
                        addTranscriptMessage(item.itemId, role, textContent, false)
                        if (role === 'assistant') {
                            updateTranscriptItem(item.itemId, {
                                guardrailResult: {
                                    status: 'IN_PROGRESS',
                                },
                            } as any)
                        }
                    } else {
                        updateTranscriptMessage(item.itemId, textContent, false)
                    }

                    if ('status' in item) {
                        updateTranscriptItem(item.itemId, {
                            status: (item as any).status === 'completed' ? 'DONE' : 'IN_PROGRESS',
                        })
                    }
                })
            })

            await client.connect()
        } catch (error) {
            console.error('Error connecting via SDK:', error)
            setSessionStatus('DISCONNECTED')
        }
    }

    const disconnectFromRealtime = () => {
        if (sdkClientRef.current) {
            sdkClientRef.current.disconnect()
            sdkClientRef.current = null
        }
        setSessionStatus('DISCONNECTED')
        setIsPTTUserSpeaking(false)
        setIsPTTActive(false)
    }

    const sendSimulatedUserMessage = (text: string) => {
        // const id = uuidv4().slice(0, 32)
        // addTranscriptMessage(id, 'user', text, true)

        // sendClientEvent(
        //     {
        //         type: 'conversation.item.create',
        //         item: {
        //             id,
        //             type: 'message',
        //             role: 'user',
        //             content: [{ type: 'input_text', text }],
        //         },
        //     },
        //     '(simulated user text message)'
        // )

        sendClientEvent(
            { type: 'response.create' },
            '(trigger response after simulated user text message)'
        )
    }

    const updateSession = (shouldTriggerResponse: boolean = false) => {
        // In SDK scenarios RealtimeClient manages session config automatically.
        if (sdkClientRef.current) {
            if (shouldTriggerResponse) {
                sendSimulatedUserMessage('hi')
            }
            // Reflect Push-to-Talk UI state by (de)activating server VAD on the
            // backend. The Realtime SDK supports live session updates via the
            // `session.update` event.
            const client = sdkClientRef.current
            if (client) {
                console.log('updateSession, isPTTActive =', isPTTActive)
                const turnDetection = isPTTActive
                    ? null
                    : {
                          type: 'server_vad',
                          threshold: 0.9,
                          prefix_padding_ms: 300,
                          silence_duration_ms: 500,
                          create_response: true,
                      }
                try {
                    client.sendEvent({
                        type: 'session.update',
                        session: {
                            turn_detection: turnDetection,
                        },
                    })
                } catch (err) {
                    console.warn('Failed to update session', err)
                }
            }
            return
        }
    }

    const cancelAssistantSpeech = async () => {
        // Interrupts server response and clears local audio.
        if (sdkClientRef.current) {
            try {
                sdkClientRef.current.interrupt()
            } catch (err) {
                console.error('Failed to interrupt', err)
            }
        }
    }

    const handleSendTextMessage = () => {
        if (!userText.trim()) return
        cancelAssistantSpeech()

        if (!sdkClientRef.current) {
            console.error('SDK client not available')
            return
        }

        try {
            sdkClientRef.current.sendUserText(userText.trim())
        } catch (err) {
            console.error('Failed to send via SDK', err)
        }

        setUserText('')
    }

    const handleTalkButtonDown = () => {
        if (sessionStatus !== 'CONNECTED' || sdkClientRef.current == null) return
        cancelAssistantSpeech()

        setIsPTTUserSpeaking(true)
        sendClientEvent({ type: 'input_audio_buffer.clear' }, 'clear PTT buffer')

        // No placeholder; we'll rely on server transcript once ready.
    }

    const handleTalkButtonUp = () => {
        if (sessionStatus !== 'CONNECTED' || sdkClientRef.current == null || !isPTTUserSpeaking)
            return

        setIsPTTUserSpeaking(false)
        sendClientEvent({ type: 'input_audio_buffer.commit' }, 'commit PTT')
        sendClientEvent({ type: 'response.create' }, 'trigger response PTT')
    }

    const onToggleConnection = () => {
        if (sessionStatus === 'CONNECTED' || sessionStatus === 'CONNECTING') {
            disconnectFromRealtime()
            setSessionStatus('DISCONNECTED')
        } else {
            connectToRealtime()
        }
    }

    useEffect(() => {
        // const storedPushToTalkUI = localStorage.getItem('pushToTalkUI')
        // if (storedPushToTalkUI) {
        //     setIsPTTActive(storedPushToTalkUI === 'true')
        // }

        const storedAudioPlaybackEnabled = localStorage.getItem('audioPlaybackEnabled')
        if (storedAudioPlaybackEnabled) {
            setIsAudioPlaybackEnabled(storedAudioPlaybackEnabled === 'true')
        }
    }, [])

    // useEffect(() => {
    //     localStorage.setItem('pushToTalkUI', isPTTActive.toString())
    // }, [isPTTActive])

    useEffect(() => {
        localStorage.setItem('audioPlaybackEnabled', isAudioPlaybackEnabled.toString())
    }, [isAudioPlaybackEnabled])

    useEffect(() => {
        if (audioElementRef.current) {
            if (isAudioPlaybackEnabled) {
                audioElementRef.current.muted = false
                audioElementRef.current.play().catch((err) => {
                    console.warn('Autoplay may be blocked by browser:', err)
                })
            } else {
                // Mute and pause to avoid brief audio blips before pause takes effect.
                audioElementRef.current.muted = true
                audioElementRef.current.pause()
            }
        }

        // Toggle server-side audio stream mute so bandwidth is saved when the
        // user disables playback. Only supported when using the SDK path.
        if (sdkClientRef.current) {
            try {
                sdkClientRef.current.mute(!isAudioPlaybackEnabled)
            } catch (err) {
                console.warn('Failed to toggle SDK mute', err)
            }
        }
    }, [isAudioPlaybackEnabled])

    // Ensure mute state is propagated to transport right after we connect or
    // whenever the SDK client reference becomes available.
    useEffect(() => {
        if (sessionStatus === 'CONNECTED' && sdkClientRef.current) {
            try {
                sdkClientRef.current.mute(!isAudioPlaybackEnabled)
            } catch (err) {
                console.warn('mute sync after connect failed', err)
            }
        }
    }, [sessionStatus, isAudioPlaybackEnabled])

    useEffect(() => {
        if (sessionStatus === 'CONNECTED' && audioElementRef.current?.srcObject) {
            // The remote audio stream from the audio element.
            const remoteStream = audioElementRef.current.srcObject as MediaStream
            startRecording(remoteStream)
        }

        // Clean up on unmount or when sessionStatus is updated.
        return () => {
            stopRecording()
        }
    }, [sessionStatus])

    return (
        <div className="flex flex-row justify-center px-2 h-[calc(100vh-4.5rem)] relative">
            <div className="flex justify-center items-end">
                <ToolBar
                    sessionStatus={sessionStatus}
                    onToggleConnection={onToggleConnection}
                    isPTTActive={isPTTActive}
                    setIsPTTActive={setIsPTTActive}
                    isPTTUserSpeaking={isPTTUserSpeaking}
                    handleTalkButtonDown={handleTalkButtonDown}
                    handleTalkButtonUp={handleTalkButtonUp}
                    isAudioPlaybackEnabled={isAudioPlaybackEnabled}
                    setIsAudioPlaybackEnabled={setIsAudioPlaybackEnabled}
                />
            </div>

            {/* TODO: The scroll bar needs to be improved.
                      That will appear on the right edge of the screen.
                      Currently it appears inside the Transcript.   */}
            <div className="flex flex-1 gap-2 pl-2 overflow-hidden relative max-w-3xl">
                <Transcript
                    userText={userText}
                    setUserText={setUserText}
                    onSendMessage={handleSendTextMessage}
                    downloadRecording={downloadRecording}
                    canSend={sessionStatus === 'CONNECTED' && sdkClientRef.current != null}
                />

                <Events isExpanded={true} />
            </div>
        </div>
    )
}
