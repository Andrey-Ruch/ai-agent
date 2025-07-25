'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

// UI components
import Transcript from '@/components/Transcript'
import ToolBar from '@/components/ToolBar'
import Events from '@/components/Events'
import AgentRespondingIndicator from '@/components/AgentRespondingIndicator'

// Types
import { SessionStatus, TranscriptItem } from '@/app/types'
import type { RealtimeAgent } from '@openai/agents/realtime'

// Context providers & hooks
import { useTranscript } from '@/app/contexts/TranscriptContext'
import { useEvent } from '@/app/contexts/EventContext'
import { useRealtimeSession } from '@/hooks/useRealtimeSession'
import { createModerationGuardrail } from '@/app/agentConfigs/guardrails'
import { useHandleSessionHistory } from '@/hooks/useHandleSessionHistory'

import useAudioDownload from '@/hooks/useAudioDownload'

// Agent configs
import { RealtimeClient } from '@/app/agentConfigs/realtimeClient'
import { allAgentSets, defaultAgentSetKey } from '@/app/agentConfigs'
import {
    chatSupervisorScenario,
    chatSupervisorCompanyName,
} from '@/app/agentConfigs/chatSupervisor'
import { ghostwriterScenario } from '@/app/agentConfigs/ghostwriter'

// Map used by connect logic for scenarios defined via the SDK.
const sdkScenarioMap: Record<string, RealtimeAgent[]> = {
    chatSupervisor: chatSupervisorScenario,
    ghostwriter: ghostwriterScenario,
}

export default function RealTimeConversation_v2() {
    const searchParams = useSearchParams()!

    const { addTranscriptMessage, addTranscriptBreadcrumb } = useTranscript()
    const { logClientEvent, logServerEvent } = useEvent()

    const [selectedAgentName, setSelectedAgentName] = useState<string>('')
    const [selectedAgentConfigSet, setSelectedAgentConfigSet] = useState<RealtimeAgent[] | null>(
        null
    )

    const audioElementRef = useRef<HTMLAudioElement | null>(null)
    // Ref to identify whether the latest agent switch came from an automatic handoff
    const handoffTriggeredRef = useRef(false)

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

    const { connect, disconnect, sendUserText, sendEvent, interrupt, mute, isAgentResponding } = useRealtimeSession({
        onConnectionChange: (s) => setSessionStatus(s as SessionStatus),
        onAgentHandoff: (agentName: string) => {
            handoffTriggeredRef.current = true
            setSelectedAgentName(agentName)
        },
    })

    const [sessionStatus, setSessionStatus] = useState<SessionStatus>('DISCONNECTED')

    const [isEventsPaneExpanded, setIsEventsPaneExpanded] = useState<boolean>(true)
    const [userText, setUserText] = useState<string>('')
    const [isPTTActive, setIsPTTActive] = useState<boolean>(false)
    const [isPTTUserSpeaking, setIsPTTUserSpeaking] = useState<boolean>(false)
    const [isAudioPlaybackEnabled, setIsAudioPlaybackEnabled] = useState<boolean>(() => {
        if (typeof window === 'undefined') return true
        const stored = localStorage.getItem('audioPlaybackEnabled')
        return stored ? stored === 'true' : true
    })

    // Initialize the recording hook.
    const { startRecording, stopRecording, downloadRecording } = useAudioDownload()

    const sendClientEvent = (eventObj: any, eventNameSuffix = '') => {
        try {
            sendEvent(eventObj)
            logClientEvent(eventObj, eventNameSuffix)
        } catch (err) {
            console.error('Failed to send via SDK', err)
        }
    }

    useHandleSessionHistory()

    useEffect(() => {
        let finalAgentConfig = searchParams.get('agentConfig')
        if (!finalAgentConfig || !allAgentSets[finalAgentConfig]) {
            finalAgentConfig = defaultAgentSetKey
            const url = new URL(window.location.toString())
            url.searchParams.set('agentConfig', finalAgentConfig)
            window.location.replace(url.toString())
            return
        }

        const agents = allAgentSets[finalAgentConfig]
        const agentKeyToUse = agents[0]?.name || ''

        setSelectedAgentName(agentKeyToUse)
        setSelectedAgentConfigSet(agents)
    }, [searchParams])

    useEffect(() => {
        if (selectedAgentName && sessionStatus === 'DISCONNECTED') {
            connectToRealtime()
        }
    }, [selectedAgentName])

    useEffect(() => {
        if (sessionStatus === 'CONNECTED' && selectedAgentConfigSet && selectedAgentName) {
            const currentAgent = selectedAgentConfigSet.find((a) => a.name === selectedAgentName)
            addTranscriptBreadcrumb(`Agent: ${selectedAgentName}`, currentAgent)
            updateSession(!handoffTriggeredRef.current)
            // Reset flag after handling so subsequent effects behave normally
            handoffTriggeredRef.current = false
        }
    }, [selectedAgentConfigSet, selectedAgentName, sessionStatus])

    useEffect(() => {
        if (sessionStatus === 'CONNECTED') {
            updateSession()
        }
    }, [isPTTActive])

    const fetchEphemeralKey = async (): Promise<string | null> => {
        logClientEvent({ url: '/session' }, 'fetch_session_token_request')
        const tokenResponse = await fetch('/api/session')
        const data = await tokenResponse.json()
        logServerEvent(data, 'fetch_session_token_response')

        if (!data.client_secret?.value) {
            logClientEvent(data, 'error.no_ephemeral_key')
            console.error('No ephemeral key provided by the server')
            setSessionStatus('DISCONNECTED')
            return null
        }

        return data.client_secret.value
    }

    const connectToRealtime = async () => {
        const agentSetKey = searchParams.get('agentConfig') || 'default'
        if (sdkScenarioMap[agentSetKey]) {
            if (sessionStatus !== 'DISCONNECTED') return
            setSessionStatus('CONNECTING')

            try {
                const EPHEMERAL_KEY = await fetchEphemeralKey()
                if (!EPHEMERAL_KEY) return

                // Ensure the selectedAgentName is first so that it becomes the root
                const reorderedAgents = [...sdkScenarioMap[agentSetKey]]
                const idx = reorderedAgents.findIndex((a) => a.name === selectedAgentName)
                if (idx > 0) {
                    const [agent] = reorderedAgents.splice(idx, 1)
                    reorderedAgents.unshift(agent)
                }

                const companyName =
                    agentSetKey === 'customerServiceRetail'
                        ? 'customerServiceRetailCompanyName'
                        : chatSupervisorCompanyName
                const guardrail = createModerationGuardrail(companyName)

                await connect({
                    getEphemeralKey: async () => EPHEMERAL_KEY,
                    initialAgents: reorderedAgents,
                    audioElement: sdkAudioElement,
                    // outputGuardrails: [guardrail],
                    extraContext: {
                        addTranscriptBreadcrumb,
                    },
                })
            } catch (err) {
                console.error('Error connecting via SDK:', err)
                setSessionStatus('DISCONNECTED')
            }
            return
        }
    }

    const disconnectFromRealtime = () => {
        disconnect()
        setSessionStatus('DISCONNECTED')
        setIsPTTUserSpeaking(false)
    }

    const sendSimulatedUserMessage = (text: string) => {
        const id = uuidv4().slice(0, 32)
        addTranscriptMessage(id, 'user', text, true)

        sendClientEvent({
            type: 'conversation.item.create',
            item: {
                id,
                type: 'message',
                role: 'user',
                content: [{ type: 'input_text', text }],
            },
        })
        sendClientEvent({ type: 'response.create' }, '(simulated user text message)')
    }

    const updateSession = (shouldTriggerResponse: boolean = false) => {
        // Reflect Push-to-Talk UI state by (de)activating server VAD on the
        // backend. The Realtime SDK supports live session updates via the
        // `session.update` event.
        const turnDetection = isPTTActive
            ? null
            : {
                  type: 'server_vad',
                  threshold: 0.9,
                  prefix_padding_ms: 300,
                  silence_duration_ms: 500,
                  create_response: true,
              }

        sendEvent({
            type: 'session.update',
            session: {
                turn_detection: turnDetection,
            },
        })

        // Send an initial 'hi' message to trigger the agent to greet the user
        if (shouldTriggerResponse) {
            sendSimulatedUserMessage('hi')
        }
        return
    }

    const handleSendTextMessage = () => {
        if (!userText.trim()) return
        // This will reset isAgentResponding to false
        interrupt()

        try {
            sendUserText(userText.trim())
            // Note: isAgentResponding will be set to true automatically when response.created event fires
        } catch (err) {
            console.error('Failed to send via SDK', err)
        }

        setUserText('')
    }

    const handleTalkButtonDown = () => {
        if (sessionStatus !== 'CONNECTED') return
        interrupt()

        setIsPTTUserSpeaking(true)
        sendClientEvent({ type: 'input_audio_buffer.clear' }, 'clear PTT buffer')

        // No placeholder; we'll rely on server transcript once ready.
    }

    const handleTalkButtonUp = () => {
        if (sessionStatus !== 'CONNECTED' || !isPTTUserSpeaking) return

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

    const handleAgentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newAgentConfig = e.target.value
        const url = new URL(window.location.toString())
        url.searchParams.set('agentConfig', newAgentConfig)
        window.location.replace(url.toString())
    }

    const handleSelectedAgentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newAgentName = e.target.value
        // Reconnect session with the newly selected agent as root so that tool
        // execution works correctly.
        disconnectFromRealtime()
        setSelectedAgentName(newAgentName)
        // connectToRealtime will be triggered by effect watching selectedAgentName
    }

    useEffect(() => {
        const storedPushToTalkUI = localStorage.getItem('pushToTalkUI')
        if (storedPushToTalkUI) {
            setIsPTTActive(storedPushToTalkUI === 'true')
        }
        const storedLogsExpanded = localStorage.getItem('logsExpanded')
        if (storedLogsExpanded) {
            setIsEventsPaneExpanded(storedLogsExpanded === 'true')
        }
        const storedAudioPlaybackEnabled = localStorage.getItem('audioPlaybackEnabled')
        if (storedAudioPlaybackEnabled) {
            setIsAudioPlaybackEnabled(storedAudioPlaybackEnabled === 'true')
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('pushToTalkUI', isPTTActive.toString())
    }, [isPTTActive])

    useEffect(() => {
        localStorage.setItem('logsExpanded', isEventsPaneExpanded.toString())
    }, [isEventsPaneExpanded])

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
        // user disables playback.
        try {
            mute(!isAudioPlaybackEnabled)
        } catch (err) {
            console.warn('Failed to toggle SDK mute', err)
        }
    }, [isAudioPlaybackEnabled])

    // Ensure mute state is propagated to transport right after we connect or
    // whenever the SDK client reference becomes available.
    useEffect(() => {
        if (sessionStatus === 'CONNECTED') {
            try {
                mute(!isAudioPlaybackEnabled)
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

    const agentSetKey = searchParams.get('agentConfig') || 'default'

    return (
        // In the calc function, 3rem refers to the height of the header in dashboard/layout.tsx
        <div className="flex flex-row justify-center h-[calc(100vh-3rem)] relative p-2">
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
                    canSend={sessionStatus === 'CONNECTED'}
                    isAgentResponding={isAgentResponding}
                />

                {/* <Events isExpanded={isEventsPaneExpanded} /> */}
            </div>
        </div>
    )
}
