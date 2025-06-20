// Types
import { SessionStatus } from '@/app/types'

// UI components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { AudioLines, X, Mic, MicOff, LoaderCircle } from 'lucide-react'

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
    sessionStatus,
    onToggleConnection,
    isPTTActive,
    setIsPTTActive,
    isPTTUserSpeaking,
    handleTalkButtonDown,
    handleTalkButtonUp,
    isAudioPlaybackEnabled,
    setIsAudioPlaybackEnabled,
}: ToolBarProps) {
    const isConnected = sessionStatus === 'CONNECTED'
    const isConnecting = sessionStatus === 'CONNECTING'

    // console.log('\nisConnected =', isConnected)
    // console.log('isConnecting =', isConnecting)
    // console.log('isPTTActive =', isPTTActive)
    // console.log('isPTTUserSpeaking =', isPTTUserSpeaking)
    // console.log('isAudioPlaybackEnabled =', isAudioPlaybackEnabled)

    // function getConnectionButtonLabel() {
    //     if (isConnected) return 'Disconnect'
    //     if (isConnecting) return '' // 'Connecting...'
    //     return 'Connect'
    // }

    function getConnectionButtonIcon() {
        if (isConnected) return <X />
        if (isConnecting) return <LoaderCircle className="animate-spin" />
        return <AudioLines />
    }

    function getConnectionButtonClasses() {
        const baseClasses = 'rounded-full'
        const cursorClass = isConnecting ? 'cursor-not-allowed' : 'cursor-pointer'
        const colorClass = isConnected ? '' : 'bg-green-600 hover:bg-green-700'

        return `${cursorClass} ${baseClasses} ${colorClass}`
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
        <div className="flex justify-center items-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Voice Agent</CardTitle>
                    <CardDescription>Demo</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center space-x-4">
                    {/* <Checkbox
                        id="push-to-talk"
                        checked={isPTTActive}
                        onCheckedChange={(checked) => {
                            setIsPTTActive(checked as boolean)
                            console.log('checked =', checked)
                        }}
                        disabled={!isConnected}
                    />
                    <Label htmlFor="push-to-talk">Push to talk</Label> */}
                    {/* <Button
                        onMouseDown={handleTalkButtonDown}
                        onMouseUp={handleTalkButtonUp}
                        onTouchStart={handleTalkButtonDown}
                        onTouchEnd={handleTalkButtonUp}
                        disabled={!isConnected}>
                        Talk
                    </Button> */}
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={!isConnected}
                        className={getMicrophoneButtonClasses()}
                        onClick={handleMicrophoneButtonClick}>
                        {getMicrophoneButtonIcon()}
                    </Button>
                    <Button
                        size="icon"
                        onClick={onToggleConnection}
                        className={getConnectionButtonClasses()}
                        disabled={isConnecting}>
                        {getConnectionButtonIcon()}
                        {/* {getConnectionButtonLabel()} */}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
