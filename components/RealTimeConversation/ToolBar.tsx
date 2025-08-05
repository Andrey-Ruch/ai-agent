// Types
import { SessionStatus } from '@/app/types'

// UI components
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Play, X, Mic, MicOff, Loader2Icon } from 'lucide-react'

interface ToolBarProps {
    sessionStatus: SessionStatus
    onToggleConnection: () => void
    isPTTActive: boolean
    setIsPTTActive: (val: boolean) => void
    isPTTUserSpeaking: boolean
    handleTalkButtonDown: () => void
    handleTalkButtonUp: () => void
    isAudioPlaybackEnabled: boolean
    setIsAudioPlaybackEnabled: (val: boolean) => void
}

export default function ToolBar({
    // isPTTUserSpeaking,
    // handleTalkButtonDown,
    // handleTalkButtonUp,
    // isAudioPlaybackEnabled,
    // setIsAudioPlaybackEnabled,
    sessionStatus,
    onToggleConnection,
    isPTTActive,
    setIsPTTActive,
}: ToolBarProps) {
    const isConnected = sessionStatus === 'CONNECTED'
    const isConnecting = sessionStatus === 'CONNECTING'

    // function getConnectionButtonLabel() {
    //     if (isConnected) return 'Disconnect'
    //     if (isConnecting) return '' // 'Connecting...'
    //     return 'Connect'
    // }

    function getConnectionButtonClasses() {
        const baseClasses = 'rounded-full text-primary'
        const cursorClass = isConnecting ? 'cursor-not-allowed' : 'cursor-pointer'

        return `${cursorClass} ${baseClasses}`
    }

    function getConnectionButtonIcon() {
        if (isConnected) return <X />
        if (isConnecting) return <Loader2Icon className="animate-spin" />
        return <Play />
    }

    function getConnectionButtonTooltip() {
        if (isConnected) return 'End Session'
        if (isConnecting) return 'Connecting...'
        return 'Start Session'
    }

    function getMicrophoneButtonIcon() {
        if (isPTTActive) return <MicOff className="text-red-500 size-5" />
        return <Mic className="text-blue-500 size-5" />
    }

    function getMicrophoneButtonClasses() {
        const baseClasses = 'rounded-full'
        const cursorClass = !isConnected ? 'cursor-not-allowed' : 'cursor-pointer'

        return `${cursorClass} ${baseClasses}`
    }

    function handleMicrophoneButtonClick() {
        if (!isConnected) return

        // Toggle PTT
        setIsPTTActive(!isPTTActive)
    }

    return (
        <div className="w-full max-w-sm py-3 rounded-xl bg-white border shadow-sm">
            <div className="flex flex-col gap-2 justify-center items-center px-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={onToggleConnection}
                            className={getConnectionButtonClasses()}
                            disabled={isConnecting}>
                            {getConnectionButtonIcon()}
                            {/* {getConnectionButtonLabel()} */}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{getConnectionButtonTooltip()}</p>
                    </TooltipContent>
                </Tooltip>
                {isConnected && (
                    <Button
                        variant="secondary"
                        size="icon"
                        disabled={!isConnected}
                        className={getMicrophoneButtonClasses()}
                        onClick={handleMicrophoneButtonClick}>
                        {getMicrophoneButtonIcon()}
                    </Button>
                )}
            </div>
        </div>
    )
}
