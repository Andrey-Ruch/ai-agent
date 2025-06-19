'use client'

import React, { useEffect, useRef, useState } from 'react'

// UI components
import ToolBar from '@/components/ToolBar'

// Types
import { SessionStatus } from './type'

// Utilities
import { RealtimeClient } from '@/app/agentConfigs/realtimeClient'
import useAudioDownload from '@/hooks/useAudioDownload'
import { agent } from '@/app/agentConfigs/chatSupervisor'

export default function App() {
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
    const [sessionStatus, setSessionStatus] = useState<SessionStatus>('DISCONNECTED')
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

    useEffect(() => {
        if (sessionStatus === 'DISCONNECTED') {
            connectToRealtime()
        }
    }, [])

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
                initialAgent: agent,
                audioElement: sdkAudioElement,
            } as any)

            sdkClientRef.current = client

            client.on('connection_change', (status) => {
                if (status === 'connected') setSessionStatus('CONNECTED')
                else if (status === 'connecting') setSessionStatus('CONNECTING')
                else setSessionStatus('DISCONNECTED')
            })

            await client.connect()
            // setSessionStatus('CONNECTED')
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
    )
}
